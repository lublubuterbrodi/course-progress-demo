import { Plus, Trash2 } from "lucide-react";
import type { CourseLessonsProps } from "../../types/props";

function CourseLessons({
  course,
  isAddingLesson,
  lessonInput,
  setError,
  onOpenLessonForm,
  onCloseLessonForm,
  onLessonInputChange,
  onAddLesson,
  onToggleLesson,
  onDeleteLesson,
}: CourseLessonsProps) {
  return (
    <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">Lessons</h3>

        <p className="mt-1 text-sm text-slate-500">
          Mark completed lessons to update course progress.
        </p>
      </div>

      {course.lessons.length > 0 && (
        <ul className="space-y-3">
          {course.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <label className="flex min-w-0 cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={lesson.isCompleted}
                  onChange={() => onToggleLesson(course.id, lesson.id)}
                  className="h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />

                <span
                  className={`wrap-break-word text-sm font-medium sm:text-base ${
                    lesson.isCompleted
                      ? "text-slate-400 line-through"
                      : "text-slate-800"
                  }`}
                >
                  {lesson.title}
                </span>
              </label>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => onToggleLesson(course.id, lesson.id)}
                  className="cursor-pointer text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                >
                  {lesson.isCompleted ? "Mark incomplete" : "Mark complete"}
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteLesson(course.id, lesson.id)}
                  className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${lesson.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isAddingLesson && course.lessons.length === 0 && (
        <button
          type="button"
          onClick={() => onOpenLessonForm(course.id)}
          className="group w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center transition hover:-translate-y-0.5 hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-sm"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition group-hover:scale-110 group-hover:bg-indigo-100">
            <Plus className="h-6 w-6" />
          </span>

          <span className="mt-4 block font-medium text-slate-700">
            No lessons yet
          </span>

          <span className="mt-1 block text-sm text-slate-500">
            Click here to add your first lesson.
          </span>
        </button>
      )}

      {!isAddingLesson && course.lessons.length > 0 && (
        <button
          type="button"
          onClick={() => onOpenLessonForm(course.id)}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-4 text-sm font-semibold text-indigo-600 transition hover:border-indigo-400 hover:bg-indigo-50/50"
        >
          <Plus className="h-5 w-5" />
          Add another lesson
        </button>
      )}

      {isAddingLesson && (
        <form
          onSubmit={(event) => onAddLesson(event, course.id)}
          className={`rounded-2xl border border-indigo-200 bg-white p-4 shadow-sm ${
            course.lessons.length > 0 ? "mt-4" : ""
          }`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <input
                id={`lesson-${course.id}`}
                type="text"
                value={lessonInput}
                onChange={(event) => {
                  onLessonInputChange(course.id, event.target.value);
                  setError("");
                }}
                placeholder="Enter lesson title"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                autoFocus
              />
            </div>

            <div className="flex gap-3 md:pb-0.5">
              <button
                type="button"
                onClick={() => onCloseLessonForm(course.id)}
                className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Add Lesson
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CourseLessons;
