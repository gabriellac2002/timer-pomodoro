export type ButtonVariant = "primary" | "secondary" | "success" | "danger";

export type Cycle = {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interuptedAt?: Date;
};
