import { Component, OnInit } from '@angular/core'
import { CommentFormModalService } from '../comment-form-modal/comment-form-modal.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private commentFormModalService: CommentFormModalService) {}

  ngOnInit(): void {}

  openModal() {
    this.commentFormModalService.open()
  }
}
