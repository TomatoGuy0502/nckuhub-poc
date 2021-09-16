import { Component, OnInit } from '@angular/core'
import { CommentService } from 'src/app/services/comment.service'
import { CourseService } from 'src/app/services/course.service'
import { CommentFormModalService } from './comment-form-modal.service'

@Component({
  selector: 'app-comment-form-modal',
  templateUrl: './comment-form-modal.component.html',
  styleUrls: ['./comment-form-modal.component.scss']
})
export class CommentFormModalComponent implements OnInit {
  isOpen$ = this.commentFormModalService.isOpen$

  formData = {
    got: 5,
    sweet: 5,
    cold: 5,
    text: '',
    semester: '',
    courseId: null as null | number
  }

  courses = this.courseService.courses

  semesterOptions = this.generateSemesters(10)
  
  handleSubmit() {
    console.log(this.formData)
    if (this.formData.text.length < 50 || !this.formData.courseId || !this.formData.semester.length) {
      alert('欄位不正確')
      return
    }
    this.commentService.addComment({
      ...this.formData,
      userId: 1,
      courseId: ~~this.formData.courseId
    }).subscribe(() => this.close())
  }

  constructor(
    private commentFormModalService: CommentFormModalService,
    private courseService: CourseService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {}

  close() {
    this.commentFormModalService.close()
  }

  generateSemesters(years: number) {
    const year = new Date().getFullYear() - 1911
    return [...Array(5).keys()]
      .map((_, i) => {
        return [`${year - i}-2`, `${year - i}-1`]
      })
      .flat()
  }
}
