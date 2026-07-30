import type { Course } from "@/content/types";

export function CoursePage({ course }: { readonly course: Course }) {
  return <h1>{course.title}</h1>;
}
