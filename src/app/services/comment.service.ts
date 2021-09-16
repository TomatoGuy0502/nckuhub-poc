import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Comment } from '../types/comment.type'
import { handleError } from '../utils/handleError'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl = 'http://localhost:3002/comments'

  constructor(private http: HttpClient) {}

  addComment(comment: Comment): Observable<Comment> {
    return this.http
      .post<Comment>(this.commentUrl, comment)
      .pipe(catchError(handleError<Comment>('addComment')))
  }

  deleteComment(commentId: number): Observable<Comment> {
    const url = `${this.commentUrl}/${commentId}`

    return this.http
      .delete<Comment>(this.commentUrl)
      .pipe(catchError(handleError<Comment>('deleteComment')))
  }

  updateComment(commentId: number, comment: Comment): Observable<Comment> {
    const url = `${this.commentUrl}/${commentId}`

    return this.http
      .put<Comment>(this.commentUrl, comment)
      .pipe(catchError(handleError<Comment>('updateComment')))
  }
}
