import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DarkmodeService {
  private theme = new BehaviorSubject<AppTheme>(localStorage.theme || AppTheme.Light)
  theme$ = this.theme.asObservable()

  constructor() {
    this.theme.subscribe(theme => {
      if (theme === AppTheme.Dark) {
        document.documentElement.classList.add('dark')
        localStorage.theme = AppTheme.Dark
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = AppTheme.Light
      }
    })
  }
  changeTheme() {
    if (this.theme.getValue() === AppTheme.Dark) {
      this.theme.next(AppTheme.Light)
    } else {
      this.theme.next(AppTheme.Dark)
    }
  }
}

export enum AppTheme {
  Light = 'Light',
  Dark = 'Dark'
}