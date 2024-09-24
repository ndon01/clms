import {UserProjection} from "@core/model/User.model";

export const GetPermissionsFromUserAsList = (user: UserProjection): string[] => {

  const permissions: string[] = [];

  user.permissions?.forEach(permission => {
    if (permission == null || permission.name == null) {
      return;
    }
    permissions.push(permission.name);
  });

  user.roles?.forEach(role => {
    role.permissions?.forEach(permission => {
      if (permission == null || permission.name == null) {
        return;
      }
      permissions.push(permission.name);
    });
  });

  return permissions;
}

export const GetPermissionsFromUserAsMap = (user: UserProjection): Map<String, Boolean> => {
  const permissions: Map<String, Boolean> = new Map<String, Boolean>();

  user.permissions?.forEach(permission => {
    if (permission == null || permission.name == null) {
      return;
    }
    permissions.set(permission.name, true);
  });

  user.roles?.forEach(role => {
    role.permissions?.forEach(permission => {
      if (permission == null || permission.name == null) {
        return;
      }
      permissions.set(permission.name, true);
    });
  });

  return permissions;
}
