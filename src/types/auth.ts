export const TipoDocumento = {
  CC: 'CC',
  CE: 'CE',
  NIT: 'NIT',
  PAS: 'PAS',
  OTRO: 'OTRO'
} as const;

export type TipoDocumento = typeof TipoDocumento[keyof typeof TipoDocumento];

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  tipoDocumento: TipoDocumento;
  documentoComprador: number;
  celularComprador: string;
  // direccionComprador: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}