import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cita, EstadoCita } from '../../../core/models/cita.model';

@Component({
  selector: 'app-cita-card',
  templateUrl: './cita-card.component.html',
  standalone: false,
})
export class CitaCardComponent {
  @Input() cita!: Cita;
  @Output() cambiarEstado = new EventEmitter<{ id: string; estado: EstadoCita }>();
  @Output() eliminar = new EventEmitter<string>();

  EstadoCita = EstadoCita;

  badgeClass(estado: EstadoCita): string {
    const map: Record<EstadoCita, string> = {
      [EstadoCita.PENDIENTE]: 'bg-warning text-dark',
      [EstadoCita.COMPLETADA]: 'bg-success',
      [EstadoCita.CANCELADA]: 'bg-danger',
    };
    return map[estado];
  }
}
