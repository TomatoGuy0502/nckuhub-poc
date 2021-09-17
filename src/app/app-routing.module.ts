import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { HomepageComponent } from './views/homepage/homepage.component';
import { CourseModalComponent } from './components/modals/course-modal/course-modal.component';
import { TimetableComponent } from './views/timetable/timetable.component';
import { UserComponent } from './views/user/user.component'
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'course/:courseId', component: CourseModalComponent },
  { path: 'timetable', component: TimetableComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AngularFireAuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
