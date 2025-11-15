import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user
} from '@angular/fire/auth';
import { from, map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  user$: Observable<any> = user(this.auth);

  loginWithGoogle$(): Observable<any> {
    const provider = new GoogleAuthProvider();
  
    return from(signInWithPopup(this.auth, provider)).pipe(
      map(cred => cred.user)
    );
  }

  logout() {
    return signOut(this.auth);
  }
}