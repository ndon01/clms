export type Permission = {
  id: number;
  name: string;
  description: string;
}

export type PermissionProjection = Partial<Permission>
