import type { DeleteCourseModalProps } from "../types/props";

function DeleteCourseModal({
  courseToDelete,
  onCancel,
  onDelete,
}: DeleteCourseModalProps) {
  if (!courseToDelete) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="animate-in fade-in zoom-in w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl duration-200">
        <h2 className="text-xl font-bold text-slate-900">Delete course?</h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700">
            "{courseToDelete.title}"
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(courseToDelete.id)}
            className="cursor-pointer rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCourseModal;
