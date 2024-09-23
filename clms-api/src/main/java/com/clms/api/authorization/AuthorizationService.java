package com.clms.api.authorization;

import com.clms.api.authorization.permissions.PermissionRepository;
import com.clms.api.authorization.roles.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthorizationService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;


    public void registerPermission(String name) {
        Permission p = permissionRepository.findByNameEqualsIgnoreCase(name).orElse(null);
        if (p != null) {
            log.info("Permission already exists: {}", name);
        } else {
            p = new Permission();
            p.setName(name);
            permissionRepository.save(p);
            log.info("Permission registered: {}", name);
        }
    }

}
