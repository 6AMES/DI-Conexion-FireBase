import { Component, Input, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ofer-soli',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ofer-soli.component.html',
  styleUrl: './ofer-soli.component.css'
})

export class OferSoliComponent implements OnInit {
  @Input() tabla: any = ''
  items: any[] = []
  oferta: boolean = false
  solicitud: boolean = false

  constructor(private databaseServiceService: DatabaseServiceService) {
    
  }

  ngOnInit(): void {
    this.databaseServiceService.getItems(this.tabla).subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error: ', err);
      }
    });

    if (this.tabla == 'Ofertas') {
      this.oferta = true
      this.solicitud = false
    } else if (this.tabla == 'Solicitudes') {
      this.oferta = false
      this.solicitud = true
    }
  }
}
