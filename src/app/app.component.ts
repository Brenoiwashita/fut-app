import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { PwaInstallService } from './pwa/pwa-install.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  canInstall$: Observable<boolean>;

  constructor(private pwaInstallService: PwaInstallService) {
    this.canInstall$ = this.pwaInstallService.canInstall$;
  }

  instalar() {
    this.pwaInstallService.installPwa();
  }}
