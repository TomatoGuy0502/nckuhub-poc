import { Course } from "./course.type";

export interface Favorite {
  id: number
  userId: number
  courseId: number
}

export interface FavoriteWithCourse extends Favorite {
  course: Course
}

