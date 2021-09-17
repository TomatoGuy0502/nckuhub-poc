import { Component, OnInit } from '@angular/core';
import { CommentFormModalService, FormData } from 'src/app/components/modals/comment-form-modal/comment-form-modal.service';
import { CommentService } from 'src/app/services/comment.service';
import { CourseModalService } from 'src/app/components/modals/course-modal/course-modal.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  comments = this.commentService.comments

  constructor(
    private commentService: CommentService,
    private commentFormModalService: CommentFormModalService,
    private courseModalService: CourseModalService
  ) { }

  ngOnInit(): void {
    this.commentService.getCurrentUserComments()
  }

  openCourseModal(courseId: number) {
    this.courseModalService.open(courseId)
  }

  editComment(e: Event, formData: FormData, commentId: number) {
    e.stopPropagation()
    this.commentFormModalService.open(formData, commentId)
  }
  
  deleteComment(e: Event, commentId: number) {
    e.stopPropagation()
    this.commentService.deleteComment(commentId).subscribe()
  }
}
