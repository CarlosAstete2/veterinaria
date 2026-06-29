export enum EspecieMascota {
  PERRO = 'Perro',
  GATO = 'Gato',
  AVE = 'Ave',
  CONEJO = 'Conejo',
  OTRO = 'Otro'
}

export interface Mascota {
  id: string;
  nombre: string;
  especie: EspecieMascota;
  raza: string;
  fechaNacimiento: string;
  propietarioNombre: string;
  propietarioTelefono: string;
  propietarioEmail: string;
  fechaRegistro: string;
}
