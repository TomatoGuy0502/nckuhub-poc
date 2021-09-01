import { Component, OnInit } from '@angular/core'
import { Subscription, Observable } from 'rxjs'
import { delay } from 'rxjs/operators'
import { CourseService } from '../../services/course.service'
import { Course } from '../../types/course.type'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  courses: Course[] = []
  coursesSub: Subscription

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourses()
  }
  ngOnDestroy(): void {
    this.coursesSub.unsubscribe()
  }

  getCourses(): void {
    this.coursesSub = this.courseService
      .getCourses()
      .pipe(delay(500))
      .subscribe(courses => {
        this.courses = courses
      })
  }
}
