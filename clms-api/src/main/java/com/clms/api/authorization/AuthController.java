package com.clms.api.authorization;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/authorization")
@RequiredArgsConstructor
public class AuthController
{
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    @GetMapping("/roles")
    public List<Role> getRoles()
    {
        return roleRepository.findAll();
    }

    @GetMapping("/permissions")
    public List<Permission> getPermissions()
    {
        return permissionRepository.findAll();
    }

    @PostMapping("/permissions")
    public ResponseEntity<?> createPermission(@RequestBody PermissionCreationDto permission)
    {

        if (permissionRepository.findByNameEqualsIgnoreCase(permission.getName()).orElse(null) != null) {
            return ResponseEntity.status(400).build();
        }

        Permission newPermission = new Permission();
        newPermission.setName(permission.getName());
        newPermission.setDescription(permission.getDescription());
        permissionRepository.save(newPermission);
        return ResponseEntity.status(201).body(permission);
    }
}

@Data
class PermissionCreationDto {
    private String name;
    private String description;
}