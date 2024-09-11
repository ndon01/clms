package com.clms.api.authorization;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/authorization")
@RequiredArgsConstructor
public class AuthorizationController
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

    @PutMapping("/permissions")
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

    @PutMapping("/roles")
    public ResponseEntity<?> createRole(@RequestBody RoleCreationDto role)
    {

        if (roleRepository.findByNameEqualsIgnoreCase(role.getName()).orElse(null) != null) {
            return ResponseEntity.status(400).build();
        }

        Permission newPermission = new Permission();
        newPermission.setName(role.getName());
        newPermission.setDescription(role.getDescription());
        permissionRepository.save(newPermission);
        return ResponseEntity.status(201).body(role);
    }


    @PostMapping("/permissions/{permissionId}")
    public ResponseEntity<?> updatePermission(@RequestBody PermissionCreationDto permission, @RequestParam int permissionId)
    {
        Permission currentPermission = permissionRepository.findById(permissionId).orElse(null);

        if (permissionRepository.findByNameEqualsIgnoreCase(permission.getName()).orElse(null) != null) {
            return ResponseEntity.status(400).build();
        }
        //decode DTO
        //see if permission exists
        // if yes then return user error + "This permission already exits"
        //if no save permission
        return null;
    }

    //updateRole

}

