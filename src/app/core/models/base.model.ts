export interface Identifiable {
  id: string;
}

export interface Auditable extends Identifiable {
  fechaRegistro: string;
}
