import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import { FavoriteService } from '../../services/favorite.service'
import { Course } from '../../types/course.type'
import { CourseListMode } from '../../views/homepage/course-list/course-list.component'

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  courses: Course[]
  courseListMode = CourseListMode.Favorite

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.getFavorites()
  }

  getFavorites(): void {
    this.favoriteService.favoriteCourses$.subscribe(data => {
      this.courses = data
    })
  }
}
