import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);

  login() {
    this.auth.loginWithGoogle$().subscribe(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/home']);
    });
  }

  logout() {
    this.auth.logout();
  }
}
