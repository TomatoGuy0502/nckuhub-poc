import { Component, OnInit } from '@angular/core'
import { DarkmodeService, AppTheme } from '../../services/darkmode.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  theme = this.darkmodeService.theme$
  AppTheme = AppTheme

  constructor(private darkmodeService: DarkmodeService, public auth: AuthService) {}

  ngOnInit(): void {}

  changeTheme() {
    this.darkmodeService.changeTheme()
  }
}
