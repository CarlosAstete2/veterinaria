import { Component, OnInit } from '@angular/core';
import { Cita, EstadoCita } from '../../../core/models/cita.model';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-agenda-citas',
  templateUrl: './agenda-citas.component.html',
  standalone: false,
})
export class AgendaCitasComponent implements OnInit {
  citas: Cita[] = [];
  filtroEstado: EstadoCita | '' = '';
  estados = Object.values(EstadoCita);

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.citas = this.citaService.getAll();
  }

  get filtradas(): Cita[] {
    if (!this.filtroEstado) return this.citas;
    return this.citas.filter((c) => c.estado === this.filtroEstado);
  }

  onCambiarEstado(evento: { id: string; estado: EstadoCita }): void {
    this.citaService.cambiarEstado(evento.id, evento.estado);
    this.cargar();
  }

  onEliminar(id: string): void {
    if (confirm('¿Eliminar esta cita?')) {
      this.citaService.delete(id);
      this.cargar();
    }
  }
}
