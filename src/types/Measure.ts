export interface Measure {
  id: number;
  value: number;
  fasting: boolean;
  exercise: boolean;
  stress: boolean;
  medication: boolean;
  user: any;
  date: Date;
  trend?: TrendType;
  created_at?: string;
  updated_at?: string;
}
export enum TrendType {
  Descrease = 1,
  Stabilize = 2,
  Increase = 3,
}

export const TrendTypeLabels = {
  [TrendType.Increase]: "Aumentar",
  [TrendType.Stabilize]: "Estabilizar",
  [TrendType.Descrease]: "Diminuir",
};
