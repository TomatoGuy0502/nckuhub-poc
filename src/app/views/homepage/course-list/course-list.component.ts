import { Component, OnInit } from '@angular/core'
import { Course } from '../../../types/course.type'
import { CourseService } from '../../../services/course.service'
import { CourseModalService } from '../course-modal/course-modal.service'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = []
  constructor(
    private courseService: CourseService,
    private courseModalService: CourseModalService
  ) {}

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((courses) => (this.courses = courses))
  }

  open(courseId: number) {
    this.courseModalService.open(courseId)
  }
}
