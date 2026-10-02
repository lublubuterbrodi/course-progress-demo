export interface Lesson {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  courseId: number;
  createdAt: string;
}

export interface Course {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  lessons: Lesson[];
}