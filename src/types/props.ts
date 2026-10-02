import type {
  Dispatch,
  MouseEvent,
  SetStateAction,
  SubmitEvent,
} from "react";

import type { Course } from "./course";

export interface CourseFormProps {
  coursesLength: number;
  isCourseFormOpen: boolean;

  courseTitle: string;
  courseDescription: string;

  setCourseTitle: Dispatch<SetStateAction<string>>;
  setCourseDescription: Dispatch<SetStateAction<string>>;
  setIsCourseFormOpen: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;

  resetCourseForm: () => void;
  handleCreateCourse: (
    event: SubmitEvent<HTMLFormElement>,
  ) => void;
}

export interface DeleteCourseModalProps {
  courseToDelete: Course | null;
  onCancel: () => void;
  onDelete: (courseId: number) => void;
}

export interface CourseCardProps {
  course: Course;
  isExpanded: boolean;
  isEditing: boolean;
  isAddingLesson: boolean;
  editedTitle: string;
  editedDescription: string;
  lessonInput: string;

  setEditedTitle: Dispatch<SetStateAction<string>>;
  setEditedDescription: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;

  onToggleCourse: (courseId: number) => void;
  onStartEditing: (
    event: MouseEvent<HTMLButtonElement>,
    course: Course,
  ) => void;
  onCancelEditing: () => void;
  onSaveCourse: (
    event: SubmitEvent<HTMLFormElement>,
    courseId: number,
  ) => void;
  onRequestDeleteCourse: (course: Course) => void;

  onOpenLessonForm: (courseId: number) => void;
  onCloseLessonForm: (courseId: number) => void;
  onLessonInputChange: (
    courseId: number,
    value: string,
  ) => void;
  onAddLesson: (
    event: SubmitEvent<HTMLFormElement>,
    courseId: number,
  ) => void;
  onToggleLesson: (
    courseId: number,
    lessonId: number,
  ) => void;
  onDeleteLesson: (
    courseId: number,
    lessonId: number,
  ) => void;
}

export interface CourseEditFormProps {
  courseId: number;
  editedTitle: string;
  editedDescription: string;

  setEditedTitle: Dispatch<SetStateAction<string>>;
  setEditedDescription: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;

  onSaveCourse: (
    event: SubmitEvent<HTMLFormElement>,
    courseId: number,
  ) => void;

  onCancelEditing: () => void;
}

export interface CourseLessonsProps {
  course: Course;
  isAddingLesson: boolean;
  lessonInput: string;

  setError: Dispatch<SetStateAction<string>>;

  onOpenLessonForm: (courseId: number) => void;
  onCloseLessonForm: (courseId: number) => void;
  onLessonInputChange: (
    courseId: number,
    value: string,
  ) => void;
  onAddLesson: (
    event: SubmitEvent<HTMLFormElement>,
    courseId: number,
  ) => void;
  onToggleLesson: (
    courseId: number,
    lessonId: number,
  ) => void;
  onDeleteLesson: (
    courseId: number,
    lessonId: number,
  ) => void;
}

export interface CourseViewProps {
  course: Course;
  isExpanded: boolean;

  progress: number;
  completedLessons: number;
  totalLessons: number;

  onToggleCourse: () => void;
  onStartEditing: (
    event: MouseEvent<HTMLButtonElement>,
    course: Course,
  ) => void;
  onRequestDeleteCourse: (
    course: Course,
  ) => void;
}