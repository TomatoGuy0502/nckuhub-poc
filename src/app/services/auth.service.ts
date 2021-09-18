import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { GoogleAuthProvider } from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { BehaviorSubject, Observable } from 'rxjs'
import { delay, first, catchError } from 'rxjs/operators'
import { handleError } from '../utils/handleError'
import { User } from '../types/user.type'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>

  private authIsLoaded = new BehaviorSubject<boolean>(true)
  authIsLoaded$ = this.authIsLoaded.asObservable()

  constructor(private router: Router, private afAuth: AngularFireAuth, private http: HttpClient) {
    this.user$ = this.afAuth.authState
    this.user$.pipe(first(), delay(1000)).subscribe(() => this.authIsLoaded.next(false))
  }

  async googleSignin() {
    try {
      const provider = new GoogleAuthProvider()
      const credential = await this.afAuth.signInWithPopup(provider)
      if (credential.user) {
        console.log(credential.user)
        this.createUser(credential.user).subscribe()
      }
    } catch (error) {
      console.error(error)
    }
  }

  createUser(user: User) {
    return this.http.post<User>('http://localhost:3000/users', {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email
    })
    .pipe(
      catchError(handleError<Comment>('createUser'))
    )
  }

  async signOut() {
    await this.afAuth.signOut()
    this.router.navigate(['/'])
  }
}
