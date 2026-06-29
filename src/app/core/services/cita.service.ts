import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Cita, EstadoCita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService extends StorageService<Cita> {
  protected override readonly storageKey = 'vet_citas';

  getAll(): Cita[] {
    return this.findAll().sort(
      (a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora)
    );
  }

  getByMascota(mascotaId: string): Cita[] {
    return this.findAll().filter((c) => c.mascotaId === mascotaId);
  }

  cambiarEstado(id: string, estado: EstadoCita): void {
    const cita = this.findById(id);
    if (cita) {
      this.save({ ...cita, estado });
    }
  }
}
