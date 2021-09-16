import { Component, OnInit, Input } from '@angular/core'
import { Course } from '../../../types/course.type'
import { CourseModalService } from '../course-modal/course-modal.service'
import { FavoriteService } from '../../../services/favorite.service'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  @Input()
  courses: Course[] = []

  @Input()
  mode?: CourseListMode

  CourseListMode = CourseListMode
  favoriteCourses = this.favoriteService.favoriteCourses

  constructor(
    private courseModalService: CourseModalService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
  }

  openModal(courseId: number) {
    this.courseModalService.open(courseId)
  }

  /**
   * 加入 / 移除我的最愛
   * @param event Event
   * @param courseId number
   * @returns boolean
   */
  handleToggleFavorite(event: Event, courseId: number) {
    event.stopPropagation()
    if (this.isInFavorite(courseId)) {
      this.favoriteService.deleteUserFavorite(courseId).subscribe()
    } else {
      this.favoriteService.addUserFavorite(courseId).subscribe()
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

export enum CourseListMode {
  Favorite = 'favorite'
}