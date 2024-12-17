import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { firebaseConfig } from './app/environment';
import { routes } from './app/app.routes';
import { provideAuth, getAuth } from '@angular/fire/auth';
 
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig.firebase)),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth())
  ],
});