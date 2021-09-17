import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { CourseService } from './course.service'
import { AuthService } from './auth.service'
import { Favorite, FavoriteWithCourse } from '../types/favorite.type'
import { Course } from '../types/course.type'
import { handleError } from '../utils/handleError'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private userId?: string
  private favoriteUrl = 'http://localhost:3002/favorites'

  favoriteCourses: Course[] = []

  constructor(private http: HttpClient, private courseService: CourseService, private auth: AuthService) {
    this.auth.user$.subscribe(user => {
      this.userId = user?.uid
      this.getCurrentUserFavorites()
    })
  }

  getCurrentUserFavorites(): void {
    if (!this.userId) {
      this.favoriteCourses.length = 0
      return
    }
    const url = `${this.favoriteUrl}?userId=${this.userId}&_expand=course`

    this.http
      .get<FavoriteWithCourse[]>(url)
      .pipe(
        tap(data => {
          this.favoriteCourses.length = 0
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
        console.log(fav)
        const url = `${this.favoriteUrl}/${fav[0].id}`
        return this.http.delete(url)
      }),
      catchError(handleError<any>('deleteUserFavorite'))
    )
  }
}
