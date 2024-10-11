import {Role} from "@modules/admin/roles/role.model";
import {Permission} from "@modules/admin/permissions/permission.model";
import {RoleProjection} from "@modules/admin/authorization/model/RoleProjection.model";
import {PermissionProjection} from "@modules/admin/authorization/model/PermissionProjection.model";

export type User = {
  id: number;
  username: string;
  password: string;
  roles: RoleProjection[];
  permissions: PermissionProjection[];
  avatarUrl: string;
}

export type UserProjection = Partial<User>;
