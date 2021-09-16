import { Course } from "./course.type";

export interface Comment {
  id?: number
  text: string
  got: number
  sweet: number
  cold: number
  semester: string
  courseId: number
  userId: number
}

export interface CommentWithCourse extends Comment {
  course: Course
}
