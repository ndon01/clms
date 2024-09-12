import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";

export type User = {
  id: number;
  username: string;
  roles: Role[];
  permissions: Permission[];
}
