import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";

export type Role = {
  id: number;
  name: string;
  description: string;
  permissions: PermissionProjection[];
}

export type RoleProjection = Partial<Role>
