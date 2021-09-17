import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
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

  private getCurrentUserFavorites(): void {
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

  private addUserFavorite(courseId: number): Observable<any> {
    if (!this.userId) {
      return of(null)
    }
    const url = this.favoriteUrl

    this.favoriteCourses.push(this.courseService.getCourseById(courseId))

    return this.http
      .post<Favorite>(url, { userId: this.userId, courseId })
      .pipe(catchError(handleError<Favorite>('addUserFavorite')))
  }

  private deleteUserFavorite(courseId: number): Observable<any> {
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

  /**
   * 判斷是要加入或移出最愛
   * @param courseId number
   * @returns void
   */
  toggleFavorite(courseId: number) {
    if (this.isInFavorite(courseId)) {
      this.deleteUserFavorite(courseId).subscribe()
    } else {
      this.addUserFavorite(courseId).subscribe()
    }
  }

  /**
   * 確認某堂課是否已被加入最愛
   * @param courseId number
   * @returns boolean
   */
  isInFavorite(courseId: number) {
    return !!this.favoriteCourses.find(course => course.id === courseId)
  }
}
