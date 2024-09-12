package com.clms.api.common.domain;

import com.clms.api.authorization.Permission;
import com.clms.api.authorization.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserProjection {
    private int id;
    private String username;
    private Set<Role> roles;
    private Set<Permission> permissions;
}
