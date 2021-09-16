import { Component, OnInit } from '@angular/core';
import { CommentFormModalService, FormData } from '../../components/modals/comment-form-modal/comment-form-modal.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  comments = this.commentService.comments

  constructor(private commentService: CommentService, private commentFormModalService: CommentFormModalService) { }

  ngOnInit(): void {
  }

  openModal(formData: FormData, commentId: number) {
    this.commentFormModalService.open(formData, commentId)
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe()
  }
}
