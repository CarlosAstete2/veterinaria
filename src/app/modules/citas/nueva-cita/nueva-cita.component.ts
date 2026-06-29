import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from '../../../core/models/mascota.model';
import { Cita, EstadoCita } from '../../../core/models/cita.model';
import { MascotaService } from '../../../core/services/mascota.service';
import { CitaService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-nueva-cita',
  templateUrl: './nueva-cita.component.html',
  standalone: false,
})
export class NuevaCitaComponent implements OnInit {
  form: FormGroup;
  mascotas: Mascota[] = [];

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private citaService: CitaService,
    private router: Router
  ) {
    this.form = this.fb.group({
      mascotaId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(3)]],
      veterinario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mascotas = this.mascotaService.getAll();
  }

  get mascotaSeleccionada(): Mascota | undefined {
    return this.mascotas.find((m) => m.id === this.form.value.mascotaId);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const cita: Cita = {
      id: this.citaService.generateId(),
      mascotaNombre: this.mascotaSeleccionada?.nombre ?? '',
      estado: EstadoCita.PENDIENTE,
      fechaCreacion: new Date().toISOString(),
      ...this.form.value,
    };
    this.citaService.save(cita);
    this.router.navigate(['/citas']);
  }

  invalido(name: string): boolean {
    const c = this.form.get(name);
    return !!(c && c.invalid && c.touched);
  }
}
