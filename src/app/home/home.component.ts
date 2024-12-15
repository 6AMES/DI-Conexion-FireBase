import { Component, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  solicitudes: any[] = [];
  ofertas: any[] = [];

  constructor(private databaseServiceService: DatabaseServiceService) {}

  ngOnInit(): void {
    this.databaseServiceService.getItems('Solicitudes').subscribe({
      next: (data) => {
        this.solicitudes = data;
      },
      error: (err) => {
        console.error('Error al obtener solicitudes: ', err);
      },
    });

    this.databaseServiceService.getItems('Ofertas').subscribe({
      next: (data) => {
        this.ofertas = data;
      },
      error: (err) => {
        console.error('Error al obtener ofertas: ', err);
      },
    });
  }
}
