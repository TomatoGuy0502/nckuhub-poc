import { Component, OnInit, Input } from '@angular/core'
import { CommentService } from 'src/app/services/comment.service'
import { CourseService } from 'src/app/services/course.service'
import { CommentFormModalService, FormData } from './comment-form-modal.service'

@Component({
  selector: 'app-comment-form-modal',
  templateUrl: './comment-form-modal.component.html',
  styleUrls: ['./comment-form-modal.component.scss']
})
export class CommentFormModalComponent implements OnInit {
  isOpen$ = this.commentFormModalService.isOpen$
  commentId: number | null

  formData: FormData

  courses = this.courseService.courses

  semesterOptions = this.generateSemesters(10)

  constructor(
    private commentFormModalService: CommentFormModalService,
    private courseService: CourseService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.commentFormModalService.defaultFormData$.subscribe(formData => {
      this.formData = formData
    })
    this.commentFormModalService.commentId$.subscribe(commentId => (this.commentId = commentId))
  }

  handleSubmit() {
    if (
      this.formData.text.length < 50 ||
      !this.formData.courseId ||
      !this.formData.semester.length
    ) {
      alert('欄位不正確')
      return
    }
    if (this.commentId) {
      // 更新
      this.commentService
        .updateComment(this.commentId!, { ...this.formData, courseId: ~~this.formData.courseId })
        .subscribe(() => this.close())
    } else {
      // 新增
      this.commentService
        .addComment({ ...this.formData, courseId: ~~this.formData.courseId })
        .subscribe(() => this.close())
    }
  }

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
