export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  CPF: string;
  password: string;
  role?: number;
  gender?: number;
  birthday: string;
}

export enum UserRole {
  patient = 1,
  doctor = 2,
}

export const UserRoleLabel = {
  [UserRole.patient]: "Paciente",
  [UserRole.doctor]: "Doutor",
};
