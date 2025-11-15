import { bootstrapApplication } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './app/environments/environment';


bootstrapApplication(AppComponent, {
  providers: [
    // 🔥 Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    // 🧩 Service Worker (PWA)
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      // opcional, mas recomendado:
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
});