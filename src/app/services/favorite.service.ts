import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { CourseService } from './course.service'
import { Favorite, FavoriteWithCourse } from '../types/favorite.type'
import { Course } from '../types/course.type'
import { handleError } from '../utils/handleError'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private userId = 1 // TODO: 使用user service
  private favoriteUrl = 'http://localhost:3002/favorites'

  favoriteCourses: Course[] = []

  constructor(private http: HttpClient, private courseService: CourseService) {
    this.getCurrentUserFavorites() // TODO: 等到user service確認使用者是誰才抓資料
  }

  getCurrentUserFavorites(): void {
    const url = `${this.favoriteUrl}?userId=${this.userId}&_expand=course`

    this.http
      .get<FavoriteWithCourse[]>(url)
      .pipe(
        tap(data => {
          data.forEach(fav => this.favoriteCourses.push(fav.course))
        }),
        catchError(handleError<FavoriteWithCourse[]>('getCurrentUserFavorites', []))
      )
      .subscribe()
  }

  addUserFavorite(courseId: number): Observable<Favorite> {
    const url = this.favoriteUrl

    this.favoriteCourses.push(this.courseService.getCourseById(courseId))

    return this.http
      .post<Favorite>(url, { userId: this.userId, courseId })
      .pipe(catchError(handleError<Favorite>('addUserFavorite')))
  }

  deleteUserFavorite(courseId: number): Observable<{}> {
    const url = `${this.favoriteUrl}?userId=${this.userId}&courseId=${courseId}`

    const indexToDelete = this.favoriteCourses.findIndex(course => course.id === courseId)
    this.favoriteCourses.splice(indexToDelete, 1)

    return this.http.get<Favorite[]>(url).pipe(
      switchMap(fav => {
        const url = `${this.favoriteUrl}/${fav[0].id}`
        return this.http.delete(url)
      }),
      catchError(handleError<any>('deleteUserFavorite'))
    )
  }
}
