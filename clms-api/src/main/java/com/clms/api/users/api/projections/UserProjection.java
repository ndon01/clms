package com.clms.api.users.api.projections;

import com.clms.api.authorization.Permission;
import com.clms.api.authorization.Role;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class UserProjection {
    private int id;
    private String username;
    private Set<Role> roles;
    private Set<Permission> permissions;
}
