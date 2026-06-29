import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../../../core/models/mascota.model';
import { HistorialEntry } from '../../../core/models/historial.model';
import { MascotaService } from '../../../core/services/mascota.service';
import { HistorialService } from '../../../core/services/historial.service';

@Component({
  selector: 'app-historial-mascota',
  templateUrl: './historial-mascota.component.html',
  standalone: false,
})
export class HistorialMascotaComponent implements OnInit {
  mascota: Mascota | undefined;
  historial: HistorialEntry[] = [];
  form: FormGroup;
  mostrarForm = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService,
    private historialService: HistorialService
  ) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      diagnostico: ['', [Validators.required, Validators.minLength(3)]],
      tratamiento: ['', [Validators.required, Validators.minLength(3)]],
      veterinario: ['', Validators.required],
      observaciones: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/mascotas']); return; }
    this.mascota = this.mascotaService.getById(id);
    if (!this.mascota) { this.router.navigate(['/mascotas']); return; }
    this.cargar(id);
  }

  cargar(mascotaId: string): void {
    this.historial = this.historialService.getByMascota(mascotaId);
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const entry: HistorialEntry = {
      id: this.historialService.generateId(),
      mascotaId: this.mascota!.id,
      ...this.form.value,
    };
    this.historialService.save(entry);
    this.form.reset();
    this.mostrarForm = false;
    this.cargar(this.mascota!.id);
  }

  eliminar(id: string): void {
    if (confirm('¿Eliminar este registro?')) {
      this.historialService.delete(id);
      this.cargar(this.mascota!.id);
    }
  }

  invalido(name: string): boolean {
    const c = this.form.get(name);
    return !!(c && c.invalid && c.touched);
  }
}
