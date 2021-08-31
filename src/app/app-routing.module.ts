import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CourseModalComponent } from './views/homepage/course-modal/course-modal.component';
import { TimetableComponent } from './views/timetable/timetable.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'course/:courseId', component: CourseModalComponent },
  { path: 'timetable', component: TimetableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
