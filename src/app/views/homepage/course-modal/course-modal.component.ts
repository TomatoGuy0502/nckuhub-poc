import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { round } from '../../../utils/math'
import { CourseModalService, CourseModalStatus } from './course-modal.service'
import { CourseWithComments } from '../../../types/course.type'
import { Comment } from '../../../types/comment.type'
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit, OnDestroy {
  status$: Observable<CourseModalStatus>
  data$: Observable<CourseWithComments>
  CourseModalStatus = CourseModalStatus

  constructor(private route: ActivatedRoute, private courseModalService: CourseModalService) {}

  ngOnInit(): void {
    this.status$ = this.courseModalService.getStatus()
    this.data$ = this.courseModalService.getCourse().pipe(debounceTime(300)) // 確保至少有0.3秒的loading畫面，不會閃一下

    // 如果是直接到這個頁面的話(不是透過點擊list-item開啟)
    const courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    if (courseId) {
      this.courseModalService.openAsRoute(courseId)
    }
  }
  ngOnDestroy(): void {
    this.courseModalService.closeAsRoute()
  }

  close(): void {
    this.courseModalService.close()
  }
  countAverage(comments: Comment[], property: 'got' | 'sweet' | 'cold') {
    return round(comments.reduce((acc, comment) => acc + comment[property], 0) / (comments.length || 1), 1)
  }
}
