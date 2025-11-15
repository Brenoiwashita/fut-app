import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PwaInstallService } from './pwa/pwa-install.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

interface AppUser {
  uid: string;
  name: string;
  email: string;
  photoUrl: string | null;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  auth = inject(AuthService);

  constructor(private pwaInstallService: PwaInstallService) {
  }
  // user$ = this.auth.user$;

  user$ = this.auth.user$.pipe(
    map(user => {
      if (!user) return null;

      const google = user.providerData?.[0] || user;

      const appUser: AppUser = {
        uid: user.uid,
        name: google.displayName ?? user.displayName ?? '',
        email: google.email ?? user.email ?? '',
        photoUrl: google.photoURL ?? user.photoURL ?? null,
      };

      return appUser;
    })
  );

  login() {
    this.auth.loginWithGoogle();
  }

  logout() {
    this.auth.logout();
  }

  instalar() {
    this.pwaInstallService.installPwa();
  }
}
