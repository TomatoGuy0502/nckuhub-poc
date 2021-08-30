import { Component, OnInit } from '@angular/core'
import { DarkmodeService, AppTheme } from '../../services/darkmode.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  theme = this.darkmodeService.theme$
  AppTheme = AppTheme

  constructor(private darkmodeService: DarkmodeService) {}

  ngOnInit(): void {}

  changeTheme() {
    this.darkmodeService.changeTheme()
  }
}
