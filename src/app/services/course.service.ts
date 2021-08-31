import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Course, CourseWithComments } from '../types/course.type'

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = 'http://localhost:3002/courses'

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>(this.courseUrl)
      .pipe(catchError(this.handleError<Course[]>('getCourses', [])))
  }

  getCourse(id: number): Observable<CourseWithComments> {
    const url = `${this.courseUrl}/${id}?_embed=comments`
    return this.http
      .get<CourseWithComments>(url)
      .pipe(catchError(this.handleError<CourseWithComments>(`getCourse id=${id}`)))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error)

      return of(result as T)
    }
  }
}
