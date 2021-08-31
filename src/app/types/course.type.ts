import { Comment } from './comment.type'

export interface Course {
  id: number
  系號: string
  選課序號: string
  課程名稱: string
  老師: string
  時間: string
  學分: number
  系所名稱: string
  心得數量: number
}

export interface CourseWithComments extends Course {
  comments: Comment[]
}