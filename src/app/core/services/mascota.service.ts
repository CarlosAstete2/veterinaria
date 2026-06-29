import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Mascota } from '../models/mascota.model';

@Injectable({ providedIn: 'root' })
export class MascotaService extends StorageService<Mascota> {
  protected override readonly storageKey = 'vet_mascotas';

  getAll(): Mascota[] {
    return this.findAll();
  }

  getById(id: string): Mascota | undefined {
    return this.findById(id);
  }
}
