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
  private favoriteUrl = (userId: string) => `http://localhost:3000/users/${userId}/favorites`

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

    this.http
      .get<Course[]>(this.favoriteUrl(this.userId))
      .pipe(
        tap(data => {
          this.favoriteCourses.length = 0
          data.forEach(course => this.favoriteCourses.push(course))
        }),
        catchError(handleError<Course[]>('getCurrentUserFavorites', []))
      )
      .subscribe()
  }

  private addUserFavorite(courseId: number): Observable<any> {
    if (!this.userId) {
      return of(null)
    }

    this.favoriteCourses.push(this.courseService.getCourseById(courseId))

    return this.http
      .post<Favorite>(this.favoriteUrl(this.userId), { userId: this.userId, courseId })
      .pipe(catchError(handleError<Favorite>('addUserFavorite')))
  }

  private deleteUserFavorite(courseId: number): Observable<any> {
    if (!this.userId) {
      return of(null)
    }

    const indexToDelete = this.favoriteCourses.findIndex(course => course.id === courseId)
    this.favoriteCourses.splice(indexToDelete, 1)

    return this.http.delete(this.favoriteUrl(this.userId), { body: { courseId } })
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
