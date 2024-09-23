package com.clms.api.admin;


public class AdminPermissionRegistry {
    public enum Permissions {
        CREATE_USER("create_user"),
        DELETE_USER("delete_user"),
        UPDATE_USER("update_user"),
        READ_USER("read_user"),
        CREATE_ROLE("create_role"),
        DELETE_ROLE("delete_role"),
        UPDATE_ROLE("update_role"),
        READ_ROLE("read_role"),
        CREATE_PERMISSION("create_permission"),
        DELETE_PERMISSION("delete_permission"),
        UPDATE_PERMISSION("update_permission"),
        READ_PERMISSION("read_permission");

        private final String permission;

        Permissions(String permission) {
            this.permission = permission;
        }

        public String getPermission() {
            return permission;
        }
    }

}
