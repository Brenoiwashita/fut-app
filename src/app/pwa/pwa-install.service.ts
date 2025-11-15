import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt: any = null;

  // true = pode mostrar o botão "Instalar"
  private canInstallSubject = new BehaviorSubject<boolean>(false);
  canInstall$ = this.canInstallSubject.asObservable();

  constructor() {
    // Disparado quando o PWA está apto a ser instalado
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event; // guardamos o evento
      this.canInstallSubject.next(true); // libera exibir o botão
    });

    // Quando o app for instalado
    window.addEventListener('appinstalled', () => {
      console.log('PWA instalado!');
      this.deferredPrompt = null;
      this.canInstallSubject.next(false);
    });
  }

  async installPwa() {
    if (!this.deferredPrompt) {
      return;
    }

    const promptEvent = this.deferredPrompt;
    promptEvent.prompt(); // abre o popup nativo

    const { outcome } = await promptEvent.userChoice;
    console.log(`Usuário escolheu: ${outcome}`); // 'accepted' ou 'dismissed'

    // Depois de usar uma vez, o evento não pode ser reutilizado
    this.deferredPrompt = null;
    this.canInstallSubject.next(false);
  }
}