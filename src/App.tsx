import CourseCard from "./components/CourseCard/CourseCard";
import CourseForm from "./components/CourseForm";
import DeleteCourseModal from "./components/DeleteCourseModal";
import Header from "./components/Header";
import { useCourses } from "./hooks/useCourses";

function App() {
  const {
    courses,
    expandedCourseId,
    isCourseFormOpen,
    courseTitle,
    courseDescription,
    courseToDelete,
    editingCourseId,
    editedTitle,
    editedDescription,
    addingLessonCourseId,
    lessonInputs,
    error,
    setIsCourseFormOpen,
    setCourseTitle,
    setCourseDescription,
    setCourseToDelete,
    setEditedTitle,
    setEditedDescription,
    setError,
    resetCourseForm,
    handleCreateCourse,
    handleDeleteCourse,
    handleToggleCourse,
    handleStartEditing,
    handleCancelEditing,
    handleSaveCourse,
    handleOpenLessonForm,
    handleCloseLessonForm,
    handleLessonInputChange,
    handleAddLesson,
    handleToggleLesson,
    handleDeleteLesson,
  } = useCourses();

  const courseForm = (
    <CourseForm
      coursesLength={courses.length}
      isCourseFormOpen={isCourseFormOpen}
      courseTitle={courseTitle}
      courseDescription={courseDescription}
      setCourseTitle={setCourseTitle}
      setCourseDescription={setCourseDescription}
      setIsCourseFormOpen={setIsCourseFormOpen}
      setError={setError}
      resetCourseForm={resetCourseForm}
      handleCreateCourse={handleCreateCourse}
    />
  );

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Header />
        {error && (
          <div
            role="alert"
            className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              className="cursor-pointer rounded-md p-1 transition hover:bg-red-100"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        {(courses.length === 0 || isCourseFormOpen) && courseForm}

        <section className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isExpanded={expandedCourseId === course.id}
              isEditing={editingCourseId === course.id}
              isAddingLesson={addingLessonCourseId === course.id}
              editedTitle={editedTitle}
              editedDescription={editedDescription}
              lessonInput={lessonInputs[course.id] ?? ""}
              setEditedTitle={setEditedTitle}
              setEditedDescription={setEditedDescription}
              setError={setError}
              onToggleCourse={handleToggleCourse}
              onStartEditing={handleStartEditing}
              onCancelEditing={handleCancelEditing}
              onSaveCourse={handleSaveCourse}
              onRequestDeleteCourse={setCourseToDelete}
              onOpenLessonForm={handleOpenLessonForm}
              onCloseLessonForm={handleCloseLessonForm}
              onLessonInputChange={handleLessonInputChange}
              onAddLesson={handleAddLesson}
              onToggleLesson={handleToggleLesson}
              onDeleteLesson={handleDeleteLesson}
            />
          ))}

          {courses.length > 0 &&
            !isCourseFormOpen &&
            expandedCourseId === null &&
            courseForm}
        </section>

        <DeleteCourseModal
          courseToDelete={courseToDelete}
          onCancel={() => setCourseToDelete(null)}
          onDelete={handleDeleteCourse}
        />
      </div>
    </main>
  );
}
export default App;
