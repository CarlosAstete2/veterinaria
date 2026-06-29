import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HistorialEntry } from '../models/historial.model';

@Injectable({ providedIn: 'root' })
export class HistorialService extends StorageService<HistorialEntry> {
  protected override readonly storageKey = 'vet_historial';

  getByMascota(mascotaId: string): HistorialEntry[] {
    return this.findAll()
      .filter((h) => h.mascotaId === mascotaId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }
}
