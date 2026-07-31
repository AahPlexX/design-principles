import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { ArrowRight, BookOpen, GraduationCap, Search } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { BASE_PATH } from "@/lib/base";
import type { SearchEntry } from "@/lib/search-index";

/**
 * The ⌘K palette.
 *
 * The only React component that runs in the browser, loaded on demand the first time the reader asks
 * for it. Everything else on the site is prerendered markup with behaviour attached.
 */

let root: Root | null = null;
let setOpenExternally: ((open: boolean, query: string) => void) | null = null;
let indexPromise: Promise<readonly SearchEntry[]> | null = null;

function loadIndex(): Promise<readonly SearchEntry[]> {
  // Cached across opens, and fetched rather than bundled so lesson titles stay out of every page load.
  indexPromise ??= fetch(`${BASE_PATH}search-index.json`)
    .then((response) => (response.ok ? (response.json() as Promise<SearchEntry[]>) : []))
    .catch(() => []);
  return indexPromise;
}

const GROUP_ICON = {
  Principles: BookOpen,
  "Craft courses": GraduationCap,
  Lessons: ArrowRight,
} as const;

function Palette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<readonly SearchEntry[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpenExternally = (next, initialQuery) => {
      setQuery(initialQuery);
      setOpen(next);
      if (next) void loadIndex().then(setEntries);
    };
    return () => {
      setOpenExternally = null;
    };
  }, []);

  const groups = useMemo(() => {
    const order = ["Principles", "Craft courses", "Lessons"] as const;
    return order
      .map((group) => ({ group, items: entries.filter((entry) => entry.g === group) }))
      .filter(({ items }) => items.length > 0);
  }, [entries]);

  // `motion` animations run in JavaScript and do not see `prefers-reduced-motion`, so every duration
  // is gated on the hook. Without this the site would ignore the setting its own pages teach.
  const duration = reduceMotion ? 0 : 0.16;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild aria-label="Search the site">
              <motion.div
                className="fixed start-1/2 top-[12vh] z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-canvas shadow-lifted"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97, y: reduceMotion ? 0 : -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, y: reduceMotion ? 0 : -4 }}
                transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              >
                <Dialog.Title className="sr-only">Search the site</Dialog.Title>

                <Command
                  loop
                  // cmdk filters on the rendered value; the haystack is passed per item instead so a
                  // match can come from a synonym the title never mentions.
                  filter={(value, search) =>
                    value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                  }
                >
                  <div className="flex items-center gap-3 border-b border-line px-4">
                    <Search aria-hidden="true" className="size-4 shrink-0 text-ink-subtle" />
                    <Command.Input
                      /*
                       * A search dialog the reader explicitly opened must focus its field. Not doing
                       * so costs an extra Tab on every open, and the dialog traps focus, so nothing
                       * is skipped past by moving it here.
                       */
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      value={query}
                      onValueChange={setQuery}
                      placeholder="Search principles, courses, and lessons"
                      className="h-12 w-full bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-subtle"
                    />
                    <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[0.6875rem] text-ink-subtle sm:inline-block">
                      Esc
                    </kbd>
                  </div>

                  <Command.List className="max-h-[min(24rem,50vh)] overflow-y-auto overscroll-contain p-2">
                    <Command.Empty className="px-3 py-8 text-center text-sm text-ink-muted">
                      Nothing matches that. Try a shorter word.
                    </Command.Empty>

                    {groups.map(({ group, items }) => {
                      const Icon = GROUP_ICON[group];
                      return (
                        <Command.Group
                          key={group}
                          heading={group}
                          className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.6875rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-ink-subtle [&_[cmdk-group-heading]]:uppercase"
                        >
                          {items.map((entry) => (
                            <Command.Item
                              key={entry.u}
                              value={`${entry.t} ${entry.k}`}
                              onSelect={() => {
                                window.location.href = entry.u;
                              }}
                              className="flex cursor-pointer items-start gap-3 rounded-md px-3 py-2 data-[selected=true]:bg-surface"
                            >
                              <Icon
                                aria-hidden="true"
                                className="mt-0.5 size-4 shrink-0 text-ink-subtle"
                              />
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-ink">
                                  {entry.t}
                                </span>
                                <span className="block truncate text-xs text-ink-subtle">
                                  {entry.d}
                                </span>
                              </span>
                            </Command.Item>
                          ))}
                        </Command.Group>
                      );
                    })}
                  </Command.List>
                </Command>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Mounts the palette on first use and opens it. Subsequent calls reuse the same root. */
export function openCommandPalette(initialQuery = ""): void {
  if (!root) {
    const host = document.createElement("div");
    host.id = "command-palette-host";
    document.body.append(host);
    root = createRoot(host);
    root.render(<Palette />);
  }

  // The effect that registers the opener runs after this tick on first mount, so retry on the next
  // frame rather than dropping the keystroke that asked for it.
  const tryOpen = (attempt = 0): void => {
    if (setOpenExternally) setOpenExternally(true, initialQuery);
    else if (attempt < 10)
      requestAnimationFrame(() => {
        tryOpen(attempt + 1);
      });
  };
  tryOpen();
}
