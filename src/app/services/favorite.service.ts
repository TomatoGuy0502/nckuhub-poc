import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { CourseService } from './course.service'
import { Favorite, FavoriteWithCourse } from '../types/favorite.type'
import { Course } from '../types/course.type'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteUrl = 'http://localhost:3002/favorites'

  private favoriteCourseIdMap = new BehaviorSubject<Map<number, boolean>>(new Map())
  favoriteCourseIdMap$ = this.favoriteCourseIdMap.asObservable()

  private favoriteCourses = new BehaviorSubject<Course[]>([])
  favoriteCourses$ = this.favoriteCourses.asObservable()

  courses: Course[]

  constructor(private http: HttpClient, private courseService: CourseService) {
    this.getUserFavorites(1)
    this.courseService.courses$.subscribe(data => this.courses = data)
  }

  getUserFavorites(userId: number): void {
    const url = `${this.favoriteUrl}?userId=${userId}&_expand=course`

    this.http.get<FavoriteWithCourse[]>(url).pipe(
      tap(data => {
        const hashTable = new Map()
        data.forEach(fav => hashTable.set(fav.courseId, true))
        this.favoriteCourseIdMap.next(hashTable)

        this.favoriteCourses.next(data.map(fav => fav.course))
      }),
      catchError(this.handleError<FavoriteWithCourse[]>('getUserFavorites', []))
    ).subscribe()
  }

  addUserFavorite(userId: number, courseId: number): Observable<Favorite> {
    const url = this.favoriteUrl

    return this.http.post<Favorite>(url, { userId, courseId }).pipe(
      tap(() => {
        const hashTable = this.favoriteCourseIdMap.getValue()
        hashTable.set(courseId, true)
        this.favoriteCourseIdMap.next(hashTable)
      }),
      tap(() => {
        const newfavoriteCourse = this.courses.find(course => course.id === courseId) as Course
        const favoriteCourses = [...this.favoriteCourses.getValue(), newfavoriteCourse]
        this.favoriteCourses.next(favoriteCourses)
      }),
      catchError(this.handleError<Favorite>('addUserFavorite'))
    )
  }

  deleteUserFavorite(userId: number, courseId: number): Observable<{}> {
    const url = `${this.favoriteUrl}?userId=${userId}&courseId=${courseId}`

    return this.http.get<Favorite[]>(url).pipe(
      tap(() => {
        const hashTable = this.favoriteCourseIdMap.getValue()
        hashTable.delete(courseId)
        this.favoriteCourseIdMap.next(hashTable)
      }),
      tap(() => {
        const favoriteCourses = this.favoriteCourses.getValue().filter(course => course.id !== courseId)
        this.favoriteCourses.next(favoriteCourses)
      }),
      switchMap(fav => {
        const url = `${this.favoriteUrl}/${fav[0].id}`
        return this.http.delete(url)
      }),
      catchError(this.handleError<any>('deleteUserFavorite'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error)

      return of(result as T)
    }
  }
}
