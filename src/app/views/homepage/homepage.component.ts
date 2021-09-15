import { Component, OnInit } from '@angular/core'
import { CourseService } from '../../services/course.service'
import { Course } from '../../types/course.type'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  courses: Course[] = this.courseService.courses

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
  }
}
