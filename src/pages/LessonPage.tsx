import type { Course, Lesson } from "@/content/types";

export function LessonPage({
  course,
  lesson,
}: {
  readonly course: Course;
  readonly lesson: Lesson;
}) {
  return (
    <h1>
      {course.title}: {lesson.title}
    </h1>
  );
}
