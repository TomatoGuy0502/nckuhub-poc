import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nckuhub-poc'
  authIsLoaded$: Observable<boolean>

  constructor(private auth: AuthService) {
    this.authIsLoaded$ = this.auth.authIsLoaded$
  }
  
  ngOnInit(): void {
  }
}
