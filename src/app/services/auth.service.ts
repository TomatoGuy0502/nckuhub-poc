import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, first } from 'rxjs/operators';

import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>

  private authIsLoaded = new BehaviorSubject<boolean>(true)
  authIsLoaded$ = this.authIsLoaded.asObservable()

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.user$ = this.afAuth.authState
    this.user$.pipe(first(), delay(1000)).subscribe(() => this.authIsLoaded.next(false))
  }

  async googleSignin() {
    try {
      const provider = new GoogleAuthProvider();
      await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
