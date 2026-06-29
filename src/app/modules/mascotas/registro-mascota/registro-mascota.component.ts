import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecieMascota, Mascota } from '../../../core/models/mascota.model';
import { MascotaService } from '../../../core/services/mascota.service';

@Component({
  selector: 'app-registro-mascota',
  templateUrl: './registro-mascota.component.html',
  standalone: false,
})
export class RegistroMascotaComponent implements OnInit {
  form: FormGroup;
  especies = Object.values(EspecieMascota);
  editando = false;
  private id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private mascotaService: MascotaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      propietarioNombre: ['', [Validators.required, Validators.minLength(2)]],
      propietarioTelefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      propietarioEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      const mascota = this.mascotaService.getById(this.id);
      if (mascota) {
        this.editando = true;
        this.form.patchValue(mascota);
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const mascota: Mascota = {
      id: this.id ?? this.mascotaService.generateId(),
      fechaRegistro: new Date().toISOString(),
      ...this.form.value,
    };
    this.mascotaService.save(mascota);
    this.router.navigate(['/mascotas']);
  }

  campo(name: string) {
    return this.form.get(name);
  }

  invalido(name: string): boolean {
    const c = this.campo(name);
    return !!(c && c.invalid && c.touched);
  }
}
