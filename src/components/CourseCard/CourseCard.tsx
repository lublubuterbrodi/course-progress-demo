import { useRef } from "react";
import CourseEditForm from "./CourseEditForm";
import CourseLessons from "./CourseLessons";
import CourseView from "./CourseView";
import type { CourseCardProps } from "../../types/props";

function CourseCard({
  course,
  isExpanded,
  isEditing,
  isAddingLesson,
  editedTitle,
  editedDescription,
  lessonInput,
  setEditedTitle,
  setEditedDescription,
  setError,
  onToggleCourse,
  onStartEditing,
  onCancelEditing,
  onSaveCourse,
  onRequestDeleteCourse,
  onOpenLessonForm,
  onCloseLessonForm,
  onLessonInputChange,
  onAddLesson,
  onToggleLesson,
  onDeleteLesson,
}: CourseCardProps) {
  const completedLessons = course.lessons.filter(
    (lesson) => lesson.isCompleted,
  ).length;

  const articleRef = useRef<HTMLElement>(null);
  const previousScroll = useRef<number | null>(null);

  const totalLessons = course.lessons.length;

  const progress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  const handleToggleCourse = () => {
    if (!isExpanded) {
      previousScroll.current = window.scrollY;

      onToggleCourse(course.id);

      setTimeout(() => {
        articleRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    } else {
      onToggleCourse(course.id);

      setTimeout(() => {
        if (previousScroll.current !== null) {
          window.scrollTo({
            top: previousScroll.current,
            behavior: "smooth",
          });
        }
      }, 50);
    }
  };

  return (
    <article
      ref={articleRef}
      className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-200 ${
        isExpanded
          ? "border-indigo-200 md:col-span-2 xl:col-span-3"
          : "border-slate-200 hover:-translate-y-1 hover:shadow-md"
      }`}
    >
      <div className="p-5 sm:p-6">
        {isEditing ? (
          <CourseEditForm
            courseId={course.id}
            editedTitle={editedTitle}
            editedDescription={editedDescription}
            setEditedTitle={setEditedTitle}
            setEditedDescription={setEditedDescription}
            setError={setError}
            onSaveCourse={onSaveCourse}
            onCancelEditing={onCancelEditing}
          />
        ) : (
          <CourseView
            course={course}
            isExpanded={isExpanded}
            progress={progress}
            completedLessons={completedLessons}
            totalLessons={totalLessons}
            onToggleCourse={handleToggleCourse}
            onStartEditing={onStartEditing}
            onRequestDeleteCourse={onRequestDeleteCourse}
          />
        )}
      </div>

      {isExpanded && (
        <CourseLessons
          course={course}
          isAddingLesson={isAddingLesson}
          lessonInput={lessonInput}
          setError={setError}
          onOpenLessonForm={onOpenLessonForm}
          onCloseLessonForm={onCloseLessonForm}
          onLessonInputChange={onLessonInputChange}
          onAddLesson={onAddLesson}
          onToggleLesson={onToggleLesson}
          onDeleteLesson={onDeleteLesson}
        />
      )}
    </article>
  );
}

export default CourseCard;
