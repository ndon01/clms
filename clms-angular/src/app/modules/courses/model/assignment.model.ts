export type Assignment = {
  id: number;
  name: string;
  description: string;

  startDate: Date;
  dueDate: Date;
}

export type AssignmentProjection = Partial<Assignment>
