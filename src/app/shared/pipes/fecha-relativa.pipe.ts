import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fechaRelativa', standalone: false })
export class FechaRelativaPipe implements PipeTransform {
  transform(fecha: string): string {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const target = new Date(fecha + 'T00:00:00');
    const diff = Math.round((target.getTime() - hoy.getTime()) / 86400000);

    if (diff === 0) return 'Hoy';
    if (diff === 1) return 'Mañana';
    if (diff === -1) return 'Ayer';
    if (diff > 1) return `En ${diff} días`;
    return `Hace ${Math.abs(diff)} días`;
  }
}
