import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import type { CourseViewProps } from "../../types/props";

function CourseView({
  course,
  isExpanded,
  progress,
  completedLessons,
  totalLessons,
  onToggleCourse,
  onStartEditing,
  onRequestDeleteCourse,
}: CourseViewProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-slate-900">
            {course.title}
          </h2>

          <p
            className={`mt-2 text-sm leading-5 text-slate-500 ${
              isExpanded ? "whitespace-pre-wrap" : "line-clamp-2 min-h-10"
            }`}
          >
            {course.description || "No description provided."}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={(event) => onStartEditing(event, course)}
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
            aria-label={`Edit ${course.title}`}
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRequestDeleteCourse(course);
            }}
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Delete ${course.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-slate-600">Progress</span>

          <span className="text-right font-semibold text-slate-900">
            {completedLessons}/{totalLessons} lessons · {progress}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleCourse}
        className="mt-5 flex w-full cursor-pointer items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
      >
        <span>{isExpanded ? "Show less" : "See more"}</span>

        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
    </>
  );
}

export default CourseView;
