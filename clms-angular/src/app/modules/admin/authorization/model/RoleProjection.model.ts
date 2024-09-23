export type Role = {
  id: number;
  name: string;
  description: string;
}

export type RoleProjection = Partial<Role>
