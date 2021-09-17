import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Location } from '@angular/common'
import { CourseWithComments } from '../../../types/course.type'
import { CourseService } from '../../../services/course.service'
import { filter, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CourseModalService {
  private courseId$ = new BehaviorSubject<number | null>(null)
  private status$ = new BehaviorSubject<CourseModalStatus>(CourseModalStatus.Close)

  constructor(
    private courseService: CourseService,
    private location: Location
  ) {
    this.location.onUrlChange(url => {
      if (url === '') {
        this.status$.next(CourseModalStatus.Close)
      }
    })
  }

  getStatus(): Observable<CourseModalStatus> {
    return this.status$.asObservable()
  }
  getCourseWithComments(): Observable<CourseWithComments> {
    return this.courseId$.pipe(
      filter(id => !!id),
      switchMap(id => {
        return this.courseService.getCourseWithComments(id as number)
      })
    )
  }
  open(courseId: number) {
    this.location.go(`/course/${courseId}`)
    this.status$.next(CourseModalStatus.Open)
    this.courseId$.next(courseId)
  }
  close() {
    this.location.go('/')
    this.status$.next(CourseModalStatus.Close)
    this.courseId$.next(null)
  }
  openAsRoute(courseId: number) {
    this.status$.next(CourseModalStatus.Full)
    this.courseId$.next(courseId)
  }
  closeAsRoute() {
    this.status$.next(CourseModalStatus.Close)
    this.courseId$.next(null)
  }
}

export enum CourseModalStatus {
  Open,
  Full,
  Close
}
