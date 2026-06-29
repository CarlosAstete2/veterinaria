import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../../core/models/mascota.model';
import { MascotaService } from '../../../core/services/mascota.service';

@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  standalone: false,
})
export class ListaMascotasComponent implements OnInit {
  mascotas: Mascota[] = [];
  busqueda = '';

  constructor(private mascotaService: MascotaService, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.mascotas = this.mascotaService.getAll();
  }

  get filtradas(): Mascota[] {
    const q = this.busqueda.toLowerCase();
    if (!q) return this.mascotas;
    return this.mascotas.filter(
      (m) =>
        m.nombre.toLowerCase().includes(q) ||
        m.especie.toLowerCase().includes(q) ||
        m.propietarioNombre.toLowerCase().includes(q)
    );
  }

  onEliminar(id: string): void {
    if (confirm('¿Eliminar esta mascota?')) {
      this.mascotaService.delete(id);
      this.cargar();
    }
  }

  onEditar(id: string): void {
    this.router.navigate(['/mascotas', id, 'editar']);
  }

  onVerHistorial(id: string): void {
    this.router.navigate(['/mascotas', id, 'historial']);
  }
}
