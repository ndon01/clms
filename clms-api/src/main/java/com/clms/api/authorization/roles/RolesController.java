package com.clms.api.authorization.roles;

import com.clms.api.authorization.Role;
import com.clms.api.authorization.Permission;
import com.clms.api.authorization.permissions.PermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authorization/roles")
@RequiredArgsConstructor
@Slf4j
public class RolesController {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    @GetMapping
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @GetMapping("/{roleId}")
    public Role getRole(@PathVariable int roleId) {
        return roleRepository.findById(roleId).orElse(null);
    }

    @GetMapping("/{roleId}/permissions")
    public List<Permission> getRolePermissions(@PathVariable int roleId) {
        return permissionRepository.getPermissionsForRoleId(roleId);
    }
}
