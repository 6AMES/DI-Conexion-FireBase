import { ApplicationConfig } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { firebaseConfig } from './environment';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
 
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig.firebase)),
    provideDatabase(() => getDatabase()),
  ],
};
