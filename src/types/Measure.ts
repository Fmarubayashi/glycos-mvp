export interface Measure {
  id: number;
  value: number;
  fasting: boolean;
  exercise: boolean;
  stress: boolean;
  medication: boolean;
  user: any;
  date: Date;
  created_at?: string;
  updated_at?: string;
}
export enum TrendType {
  Increase = "increase",
  Stabilize = "stabilize",
  Descrease = "decrease",
}

export const TrendTypeLabels = {
  [TrendType.Increase]: "Aumentar",
  [TrendType.Stabilize]: "Estabilizar",
  [TrendType.Descrease]: "Diminuir",
};
