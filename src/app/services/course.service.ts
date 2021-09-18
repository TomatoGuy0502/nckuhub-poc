import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Course, CourseWithComments } from '../types/course.type'
import { handleError } from '../utils/handleError'

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = 'http://localhost:3000/courses'

  courses: Course[] = []

  constructor(private http: HttpClient) {
    this.getCourses()
  }

  private getCourses(): void {
    this.http
      .get<Course[]>(this.courseUrl)
      .pipe(
        tap(courses => {
          courses.forEach(course => this.courses.push(course))
        }),
        catchError(handleError<Course[]>('getCourses', []))
      ).subscribe()
  }

  getCourseById(courseId: number): Course {
    return this.courses.find(course => course.id === courseId)!
  }

  getCourseWithComments(id: number): Observable<CourseWithComments> {
    const url = `${this.courseUrl}/${id}`
    return this.http
      .get<CourseWithComments>(url)
      .pipe(catchError(handleError<CourseWithComments>(`getCourseWithComments id=${id}`)))
  }
}
