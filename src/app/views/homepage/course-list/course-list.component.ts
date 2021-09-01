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
  courses!: Course[]

  @Input()
  mode?: CourseListMode

  CourseListMode = CourseListMode
  favoriteCourseIdMap: Map<number, boolean>

  constructor(
    private courseModalService: CourseModalService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.favoriteService.favoriteCourseIdMap$.subscribe(idMap => this.favoriteCourseIdMap = idMap)
  }

  open(courseId: number) {
    this.courseModalService.open(courseId)
  }

  handleToggleFavorite(event: any, courseId: number) {
    event.stopPropagation()
    if (this.favoriteCourseIdMap.has(courseId)) {
      this.favoriteService.deleteUserFavorite(1, courseId).subscribe()
    } else {
      this.favoriteService.addUserFavorite(1, courseId).subscribe()
    }
  }
}

export enum CourseListMode {
  Favorite = 'favorite'
}