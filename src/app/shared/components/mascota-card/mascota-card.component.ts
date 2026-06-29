import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mascota } from '../../../core/models/mascota.model';

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  standalone: false,
})
export class MascotaCardComponent {
  @Input() mascota!: Mascota;
  @Output() eliminar = new EventEmitter<string>();
  @Output() editar = new EventEmitter<string>();
  @Output() verHistorial = new EventEmitter<string>();
}
