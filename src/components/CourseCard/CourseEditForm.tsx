import { Check, X } from "lucide-react";
import type { CourseEditFormProps } from "../../types/props";

function CourseEditForm({
  courseId,
  editedTitle,
  editedDescription,
  setEditedTitle,
  setEditedDescription,
  setError,
  onSaveCourse,
  onCancelEditing,
}: CourseEditFormProps) {
  return (
    <form onSubmit={(event) => onSaveCourse(event, courseId)}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <label htmlFor={`edit-title-${courseId}`} className="sr-only">
              Course title
            </label>

            <input
              id={`edit-title-${courseId}`}
              type="text"
              value={editedTitle}
              onChange={(event) => {
                setEditedTitle(event.target.value);
                setError("");
              }}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xl font-bold text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor={`edit-description-${courseId}`} className="sr-only">
              Course description
            </label>

            <textarea
              id={`edit-description-${courseId}`}
              value={editedDescription}
              onChange={(event) => setEditedDescription(event.target.value)}
              rows={3}
              placeholder="Course description"
              className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm leading-5 text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
          <button
            type="submit"
            className="cursor-pointer rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50 hover:text-emerald-700"
            aria-label="Save course changes"
            title="Save changes"
          >
            <Check className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onCancelEditing}
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cancel course editing"
            title="Cancel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default CourseEditForm;
