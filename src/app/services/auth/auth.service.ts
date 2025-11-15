import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  user$: Observable<any> = user(this.auth);

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      console.log('[Auth] Iniciando login com Google...');
      const cred = await signInWithPopup(this.auth, provider);
      console.log('[Auth] Login OK, user:', cred.user);
      return cred.user;
    } catch (err: any) {
      console.error('[Auth] ERRO no login com Google:');
      console.error('code:', err?.code);
      console.error('message:', err?.message);
      console.error(err);
      throw err;
    }
  }

  logout() {
    console.log('[Auth] Logout chamado');
    return signOut(this.auth);
  }
}