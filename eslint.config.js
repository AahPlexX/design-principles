import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "docs/**", "node_modules/**", "coverage/**"] },

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // `disallowTypeAnnotations: false` because the build scripts describe modules they load at
      // runtime with `typeof import(...)`, which has no static-import equivalent.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports", disallowTypeAnnotations: false },
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
    },
  },

  // Browser code. The accessibility rules are on as errors, not warnings: this site teaches
  // accessibility, so a violation here is a contradiction rather than a style nit.
  {
    files: ["src/**/*.{ts,tsx}"],
    settings: {
      // Tell jsx-a11y which project components render which element, so its rules follow content
      // through the wrappers instead of only checking literal <a>/<h3> in the same file. Without this
      // the wrappers themselves report false positives while real misuse at call sites goes unchecked.
      "jsx-a11y": {
        polymorphicPropName: "as",
        components: {
          ButtonLink: "a",
          Button: "button",
          CardLink: "a",
          CardTitle: "h3",
          CardBody: "p",
          CardMeta: "p",
          ContentHtml: "p",
        },
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
    extends: [jsxA11y.flatConfigs.strict],
    // eslint-plugin-react-hooks 7 still ships only eslintrc-format configs (their `plugins` is an
    // array of strings), so the plugin is registered here and its rules are pulled in directly rather
    // than through `extends`.
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      "jsx-a11y/no-onchange": "off",
    },
  },

  // Build and gate scripts run in Node and are allowed to write to stdout — reporting results is
  // their entire purpose.
  {
    files: ["scripts/**/*.ts", "vite.config.ts", "eslint.config.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off",
    },
  },

  {
    files: ["**/*.test.{ts,tsx}", "src/test/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },

  // The ESLint config itself is plain JavaScript and deliberately outside the TypeScript project, so
  // the type-aware rules cannot apply to it.
  {
    files: ["eslint.config.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },

  prettier,
);
