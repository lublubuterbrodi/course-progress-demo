import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";

import type { Course } from "../types/course";

const STORAGE_KEY = "course-progress-demo";

const initialCourses: Course[] = [
  {
    id: 1,
    title: "React Fundamentals",
    description:
      "Learn the core concepts of React and build interactive user interfaces.",
    createdAt: "2026-09-20T10:00:00.000Z",
    lessons: [
      {
        id: 1,
        title: "Components and Props",
        description: null,
        isCompleted: true,
        courseId: 1,
        createdAt: "2026-09-20T10:00:00.000Z",
      },
      {
        id: 2,
        title: "State and Events",
        description: null,
        isCompleted: true,
        courseId: 1,
        createdAt: "2026-09-20T10:00:00.000Z",
      },
      {
        id: 3,
        title: "React Hooks",
        description: null,
        isCompleted: false,
        courseId: 1,
        createdAt: "2026-09-20T10:00:00.000Z",
      },
      {
        id: 4,
        title: "Building a Small Project",
        description: null,
        isCompleted: false,
        courseId: 1,
        createdAt: "2026-09-20T10:00:00.000Z",
      },
    ],
  },
  {
    id: 2,
    title: "TypeScript Essentials",
    description:
      "Practice TypeScript fundamentals and use strong typing in real projects.",
    createdAt: "2026-09-22T10:00:00.000Z",
    lessons: [
      {
        id: 5,
        title: "Basic Types",
        description: null,
        isCompleted: true,
        courseId: 2,
        createdAt: "2026-09-22T10:00:00.000Z",
      },
      {
        id: 6,
        title: "Interfaces",
        description: null,
        isCompleted: true,
        courseId: 2,
        createdAt: "2026-09-22T10:00:00.000Z",
      },
      {
        id: 7,
        title: "Generics",
        description: null,
        isCompleted: true,
        courseId: 2,
        createdAt: "2026-09-22T10:00:00.000Z",
      },
    ],
  },
  {
    id: 3,
    title: "Node.js & Express",
    description:
      "Build REST APIs with Node.js, Express and PostgreSQL.",
    createdAt: "2026-09-25T10:00:00.000Z",
    lessons: [
      {
        id: 8,
        title: "Express Setup",
        description: null,
        isCompleted: false,
        courseId: 3,
        createdAt: "2026-09-25T10:00:00.000Z",
      },
      {
        id: 9,
        title: "REST API Routes",
        description: null,
        isCompleted: false,
        courseId: 3,
        createdAt: "2026-09-25T10:00:00.000Z",
      },
      {
        id: 10,
        title: "PostgreSQL Integration",
        description: null,
        isCompleted: false,
        courseId: 3,
        createdAt: "2026-09-25T10:00:00.000Z",
      },
    ],
  },
];

function getInitialCourses(): Course[] {
  const storedCourses = localStorage.getItem(STORAGE_KEY);

  if (!storedCourses) {
    return initialCourses;
  }

  try {
    return JSON.parse(storedCourses) as Course[];
  } catch {
    return initialCourses;
  }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>(getInitialCourses);

  const [expandedCourseId, setExpandedCourseId] = useState<number | null>(null);

  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const [addingLessonCourseId, setAddingLessonCourseId] =
    useState<number | null>(null);

  const [lessonInputs, setLessonInputs] = useState<Record<number, string>>({});

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const resetCourseForm = () => {
    setCourseTitle("");
    setCourseDescription("");
    setError("");
    setIsCourseFormOpen(false);
  };

  const handleCreateCourse = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedTitle = courseTitle.trim();
    const trimmedDescription = courseDescription.trim();

    if (!trimmedTitle) {
      setError("Course title is required.");
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      title: trimmedTitle,
      description: trimmedDescription || null,
      createdAt: new Date().toISOString(),
      lessons: [],
    };

    setCourses((currentCourses) => [
      ...currentCourses,
      newCourse,
    ]);

    resetCourseForm();
  };

  const handleDeleteCourse = (courseId: number) => {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== courseId),
    );

    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
    }

    if (editingCourseId === courseId) {
      setEditingCourseId(null);
      setEditedTitle("");
      setEditedDescription("");
    }

    if (addingLessonCourseId === courseId) {
      setAddingLessonCourseId(null);
    }

    setLessonInputs((currentInputs) => {
      const nextInputs = { ...currentInputs };
      delete nextInputs[courseId];
      return nextInputs;
    });

    setCourseToDelete(null);
    setError("");
  };

  const handleToggleCourse = (courseId: number) => {
    setExpandedCourseId((currentId) =>
      currentId === courseId ? null : courseId,
    );

    if (expandedCourseId === courseId) {
      setAddingLessonCourseId(null);
    }

    setError("");
  };

  const handleStartEditing = (
    event: MouseEvent<HTMLButtonElement>,
    course: Course,
  ) => {
    event.stopPropagation();

    setEditingCourseId(course.id);
    setEditedTitle(course.title);
    setEditedDescription(course.description ?? "");
    setError("");
  };

  const handleCancelEditing = () => {
    setEditingCourseId(null);
    setEditedTitle("");
    setEditedDescription("");
    setError("");
  };

  const handleSaveCourse = (
    event: FormEvent<HTMLFormElement>,
    courseId: number,
  ) => {
    event.preventDefault();

    const trimmedTitle = editedTitle.trim();
    const trimmedDescription = editedDescription.trim();

    if (!trimmedTitle) {
      setError("Course title is required.");
      return;
    }

    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              title: trimmedTitle,
              description: trimmedDescription || null,
            }
          : course,
      ),
    );

    handleCancelEditing();
  };

  const handleOpenLessonForm = (courseId: number) => {
    setAddingLessonCourseId(courseId);
    setError("");
  };

  const handleCloseLessonForm = (courseId: number) => {
    setAddingLessonCourseId(null);
    setError("");

    setLessonInputs((currentInputs) => ({
      ...currentInputs,
      [courseId]: "",
    }));
  };

  const handleLessonInputChange = (
    courseId: number,
    value: string,
  ) => {
    setLessonInputs((currentInputs) => ({
      ...currentInputs,
      [courseId]: value,
    }));
  };

  const handleAddLesson = (
    event: FormEvent<HTMLFormElement>,
    courseId: number,
  ) => {
    event.preventDefault();

    const lessonTitle = lessonInputs[courseId]?.trim();

    if (!lessonTitle) {
      setError("Lesson title is required.");
      return;
    }

    const lessonId = Date.now();

    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lessons: [
                ...course.lessons,
                {
                  id: lessonId,
                  title: lessonTitle,
                  description: null,
                  isCompleted: false,
                  courseId,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : course,
      ),
    );

    setLessonInputs((currentInputs) => ({
      ...currentInputs,
      [courseId]: "",
    }));

    setAddingLessonCourseId(null);
    setError("");
  };

  const handleToggleLesson = (
    courseId: number,
    lessonId: number,
  ) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lessons: course.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      isCompleted: !lesson.isCompleted,
                    }
                  : lesson,
              ),
            }
          : course,
      ),
    );

    setError("");
  };

  const handleDeleteLesson = (
    courseId: number,
    lessonId: number,
  ) => {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lessons: course.lessons.filter(
                (lesson) => lesson.id !== lessonId,
              ),
            }
          : course,
      ),
    );

    setError("");
  };

  return {
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
  };
}