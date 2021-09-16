import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Comment, CommentWithCourse } from '../types/comment.type'
import { handleError } from '../utils/handleError'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private userId = 1 // TODO: 使用user service
  private commentUrl = 'http://localhost:3002/comments'

  constructor(private http: HttpClient) {
    this.getCurrentUserComments()
  }

  comments: CommentWithCourse[] = []

  private getCurrentUserComments() {
    const url = `${this.commentUrl}?userId=${this.userId}&_expand=course`

    this.http
      .get<CommentWithCourse[]>(url)
      .pipe(
        tap(data => {
          data.forEach(comment => this.comments.push(comment))
        }),
        catchError(handleError<CommentWithCourse[]>('getCurrentUserComments', []))
      )
      .subscribe()
  }

  addComment(comment: Comment): Observable<CommentWithCourse> {
    return this.http
      .post<CommentWithCourse>(this.commentUrl, comment)
      .pipe(
        tap(() => {
          this.comments.length = 0
          this.getCurrentUserComments()
        }), 
        catchError(handleError<CommentWithCourse>('addComment'))
      )
  }

  deleteComment(commentId: number): Observable<Comment> {
    const url = `${this.commentUrl}/${commentId}`

    return this.http.delete<Comment>(url).pipe(
      tap(() => {
        const index = this.comments.findIndex(comment => comment.id === commentId)
        this.comments.splice(index, 1)
      }),
      catchError(handleError<Comment>('deleteComment'))
    )
  }

  updateComment(commentId: number, comment: Comment): Observable<Comment> {
    const url = `${this.commentUrl}/${commentId}`

    return this.http
      .put<Comment>(url, comment)
      .pipe(catchError(handleError<Comment>('updateComment')))
  }
}
