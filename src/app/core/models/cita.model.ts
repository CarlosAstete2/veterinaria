export enum EstadoCita {
  PENDIENTE = 'PENDIENTE',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA'
}

export interface Cita {
  id: string;
  mascotaId: string;
  mascotaNombre: string;
  fecha: string;
  hora: string;
  motivo: string;
  estado: EstadoCita;
  veterinario: string;
  fechaCreacion: string;
}
