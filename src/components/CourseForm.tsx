import { Plus, X } from "lucide-react";
import type { CourseFormProps } from "../types/props";

function CourseForm({
  coursesLength,
  isCourseFormOpen,
  courseTitle,
  courseDescription,
  setCourseTitle,
  setCourseDescription,
  setIsCourseFormOpen,
  setError,
  resetCourseForm,
  handleCreateCourse,
}: CourseFormProps) {
  if (!isCourseFormOpen) {
    if (coursesLength === 0) {
      return (
        <button
          type="button"
          onClick={() => {
            setIsCourseFormOpen(true);
            setError("");
          }}
          className="mb-6 w-full cursor-pointer rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50/30 hover:shadow-md active:scale-[0.99] sm:px-10 sm:py-20"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <Plus className="h-8 w-8" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900 sm:text-2xl">
            No courses yet
          </h2>

          <p className="mx-auto mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Create your first course to start adding lessons and tracking your
            progress
          </p>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => {
          setIsCourseFormOpen(true);
          setError("");
        }}
        className="group flex h-full min-h-0 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6 text-center transition duration-200 hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50/40 hover:shadow-md"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition duration-200 group-hover:scale-110 group-hover:bg-indigo-700">
          <Plus className="h-7 w-7" />
        </span>

        <span className="mt-4 text-lg font-semibold text-slate-800">
          Add Course
        </span>

        <span className="mt-1 text-sm text-slate-500">
          Create another course
        </span>
      </button>
    );
  }

  return (
    <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Create a new course
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter a title and optional description
          </p>
        </div>

        <button
          type="button"
          onClick={resetCourseForm}
          className="cursor-pointer rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Close course form"
        >
          <X />
        </button>
      </div>

      <form onSubmit={handleCreateCourse} className="space-y-5">
        <div>
          <label
            htmlFor="course-title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Course title
          </label>

          <input
            id="course-title"
            type="text"
            value={courseTitle}
            onChange={(event) => {
              setCourseTitle(event.target.value);
              setError("");
            }}
            placeholder="For example: React Basics"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="course-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="course-description"
            value={courseDescription}
            onChange={(event) => setCourseDescription(event.target.value)}
            placeholder="What do you want to learn in this course?"
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={resetCourseForm}
            className="cursor-pointer rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            Create Course
          </button>
        </div>
      </form>
    </section>
  );
}

export default CourseForm;
