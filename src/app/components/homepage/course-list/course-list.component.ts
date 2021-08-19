import { Component, OnInit } from '@angular/core';
import { Course } from '../../../types/course.type'
import { Feedback } from '../../../types/feedback.type';
import { CourseService } from '../../../services/course.service'
import { FeedbackService } from '../../../services/feedback.service'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = []
  feedback?: Feedback
  constructor(
    private courseService: CourseService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => this.courses = courses)
  }
  getFeedback(courseId: number): void {
    this.feedbackService.getFeedback(courseId).subscribe(feedback => {
      this.feedback = feedback[0]
      console.log(this.feedback)
    })
  }
}
