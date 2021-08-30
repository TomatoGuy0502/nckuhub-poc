import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CourseModalService } from './course-modal.service'
import { Feedback } from '../../../types/feedback.type'

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  status$: Observable<string>
  data$: Observable<Feedback>

  constructor(private courseModalService: CourseModalService) {}

  ngOnInit(): void {
    this.status$ = this.courseModalService.getStatus()
    this.data$ = this.courseModalService.getFeedback()
  }

  close() {
    this.courseModalService.close()
  }
}
