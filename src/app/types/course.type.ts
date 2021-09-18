import { Comment } from './comment.type'

interface Department {
  id: string
  name: string
}
export interface Course {
  id: number
  code: string
  name: string
  teacher: string
  time: string
  credit: number
  department: Department
  commentsCount: number
}

export interface CourseWithComments extends Course {
  comments: Comment[]
}