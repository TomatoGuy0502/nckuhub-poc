import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, UserCredential } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

import { User } from '../types/user.type';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges() as Observable<User>
        } else {
          return of(null)
        }
      })
    )
  }

  async googleSignin() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user!);
    } catch (error) {
      console.error(error);
    }
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName,
      photoURL: user.photoURL
    } 

    return userRef.set(data, { merge: true })
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
