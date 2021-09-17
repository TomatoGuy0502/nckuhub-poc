import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.user$ = this.afAuth.authState
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
