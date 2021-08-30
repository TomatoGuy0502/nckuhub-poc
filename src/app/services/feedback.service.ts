import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Feedback } from '../types/feedback.type'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = 'http://localhost:3000/feedbacks'

  constructor(private http: HttpClient) {}

  getFeedback(id: number): Observable<Feedback> {
    const url = `${this.feedbackUrl}?courseId=${id}&_expand=course`
    return this.http.get<Feedback[]>(url).pipe(
      map((val) => val[0]),
      catchError(this.handleError<Feedback>(`getFeedback courseId=${id}`))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error)

      return of(result as T)
    }
  }
}
