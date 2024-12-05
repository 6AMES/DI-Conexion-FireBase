import { Component } from '@angular/core';
import { firebaseConfig } from '../environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() {
    console.log('Firebase initialized:', firebaseConfig);
  }
}
