import { User } from "./User";

export interface Observation {
  observation: string;
  patient: User;
  doctor: User;
  created_at: string;
  updated_at: string;
}
