import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimetableComponent } from './views/timetable/timetable.component';
import { NavlinkComponent } from './components/sidebar/navlink/navlink.component';
import { FilterComponent } from './views/homepage/filter/filter.component';
import { CourseListComponent } from './views/homepage/course-list/course-list.component';
import { CourseModalComponent } from './views/homepage/course-modal/course-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SidebarComponent,
    TimetableComponent,
    NavlinkComponent,
    FilterComponent,
    CourseListComponent,
    CourseModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
