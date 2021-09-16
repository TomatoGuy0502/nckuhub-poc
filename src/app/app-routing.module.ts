import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CourseModalComponent } from './components/modals/course-modal/course-modal.component';
import { TimetableComponent } from './views/timetable/timetable.component';
import { UserComponent } from './views/user/user.component'

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'course/:courseId', component: CourseModalComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
