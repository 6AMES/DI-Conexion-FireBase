import { Component, Input, OnInit } from '@angular/core';
import { DatabaseServiceService } from '../services/database-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ofer-soli',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ofer-soli.component.html',
  styleUrl: './ofer-soli.component.css'
})
export class OferSoliComponent implements OnInit {
  @Input() tabla: any = '';
  items: any[] = [];
  filteredItems: any[] = []; 

  oferta: boolean = false;
  solicitud: boolean = false;

  ubicacionFiltro: string = '';
  vacanteFiltro: string = '';
  experienciaFiltro: string = '';
  habilidadesFiltro: string = '';

  constructor(private databaseServiceService: DatabaseServiceService) {}

  ngOnInit(): void {
    this.databaseServiceService.getItems(this.tabla).subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = [...this.items];
      },
      error: (err) => console.error('Error: ', err)
    });

    if (this.tabla === 'Ofertas') {
      this.oferta = true;
      this.solicitud = false;
    } else if (this.tabla === 'Solicitudes') {
      this.oferta = false;
      this.solicitud = true;
    }
  }

  filtrarItems(): void {
    this.filteredItems = this.items.filter(item => {
      if (this.oferta) {
        return (
          (this.ubicacionFiltro === '' || item.ubicacion.toLowerCase() === this.ubicacionFiltro.toLowerCase()) &&
          (this.vacanteFiltro === '' || item.vacante.toLowerCase().includes(this.vacanteFiltro.toLowerCase()))
        );
      } else if (this.solicitud) {
        return (
          (this.experienciaFiltro === '' || item.experiencia === this.experienciaFiltro) &&
          (this.habilidadesFiltro === '' || item.habilidades.toLowerCase().includes(this.habilidadesFiltro.toLowerCase()))
        );
      }
      return true;
    });
  }
}
