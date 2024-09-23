package com.clms.api.authorization;

import com.clms.api.authorization.roles.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleUpdateService {
    private final RoleRepository roleRepository;
    public void updateRole(int roleId, Role role) {

        Role existingRole = roleRepository.findById(roleId).orElse(null);
        if (existingRole == null) {
            throw new RuntimeException("Role with id " + roleId + " not found.");
        }

        existingRole.setName(role.getName());
        existingRole.setPermissions(role.getPermissions());

        roleRepository.save(existingRole);
    }
}
