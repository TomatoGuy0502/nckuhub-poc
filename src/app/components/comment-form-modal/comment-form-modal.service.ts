import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export interface FormData {
  got: number,
  sweet: number,
  cold: number,
  text: string,
  semester: string,
  courseId: null | number
}

const initFormData = {
  got: 5,
  sweet: 5,
  cold: 5,
  text: '',
  semester: '',
  courseId: null
}

@Injectable({
  providedIn: 'root'
})
export class CommentFormModalService {
  private isOpen = new BehaviorSubject<boolean>(false)
  isOpen$ = this.isOpen.asObservable()

  private defaultFormData = new BehaviorSubject<FormData>({
    got: 5,
    sweet: 5,
    cold: 5,
    text: '',
    semester: '',
    courseId: null
  })
  defaultFormData$ = this.defaultFormData.asObservable()

  private commentId = new BehaviorSubject<number | null>(null)
  commentId$ = this.commentId.asObservable()

  constructor() {}

  open(formData?: FormData, commentId?: number) {
    if (formData && commentId) {
      this.defaultFormData.next(formData)
      this.commentId.next(commentId)
    } else {
      this.defaultFormData.next(initFormData)
      this.commentId.next(null)
    }
    this.isOpen.next(true)
  }
  close() {
    this.isOpen.next(false)
  }
}
