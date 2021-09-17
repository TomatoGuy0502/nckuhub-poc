import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { HomepageComponent } from './views/homepage/homepage.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { TimetableComponent } from './views/timetable/timetable.component'
import { NavlinkComponent } from './components/sidebar/navlink/navlink.component'
import { FilterComponent } from './views/homepage/filter/filter.component'
import { CourseListComponent } from './views/homepage/course-list/course-list.component'
import { CourseModalComponent } from './components/modals/course-modal/course-modal.component'
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component'
import { CommentFormModalComponent } from './components/modals/comment-form-modal/comment-form-modal.component'
import { BackdropComponent } from './components/backdrop/backdrop.component'
import { NumberInputComponent } from './components/modals/comment-form-modal/number-input/number-input.component'
import { UserComponent } from './views/user/user.component'
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { environment } from '../environments/environment'

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
    CourseModalComponent,
    FavoriteListComponent,
    CommentFormModalComponent,
    BackdropComponent,
    NumberInputComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
