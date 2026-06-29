import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from '../../core/models/cita.model';

@Pipe({ name: 'estadoCita', standalone: false })
export class EstadoCitaPipe implements PipeTransform {
  private readonly labels: Record<EstadoCita, string> = {
    [EstadoCita.PENDIENTE]: 'Pendiente',
    [EstadoCita.COMPLETADA]: 'Completada',
    [EstadoCita.CANCELADA]: 'Cancelada',
  };

  transform(estado: EstadoCita): string {
    return this.labels[estado] ?? estado;
  }
}
