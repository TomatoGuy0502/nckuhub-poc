import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { TimetableComponent } from './views/timetable/timetable.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'timetable', component: TimetableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
