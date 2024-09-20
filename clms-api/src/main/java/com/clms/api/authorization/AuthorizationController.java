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


        if (permissionRepository.findByNameEqualsIgnoreCase(permission.getName()).isPresent() &&
                !currentPermission.getName().equalsIgnoreCase(permission.getName())) {
            return ResponseEntity.status(400).body("Permission with this name already exists.");
        }

        currentPermission.setName(permission.getName());
        currentPermission.setDescription(permission.getDescription());
        permissionRepository.save(currentPermission);

        return ResponseEntity.ok(currentPermission);
    }

    @PostMapping("/roles/{roleId}")
    public ResponseEntity<?> updateRole(@RequestBody RoleCreationDto roleDto, @PathVariable int roleId) {
        Role currentRole = roleRepository.findById(roleId).orElse(null);
        if (currentRole == null) {
            return ResponseEntity.status(404).body("Role not found.");
        }

        if (roleRepository.findByNameEqualsIgnoreCase(roleDto.getName()).isPresent() &&
                !currentRole.getName().equalsIgnoreCase(roleDto.getName())) {
            return ResponseEntity.status(400).body("Role with this name already exists.");
        }

        currentRole.setName(roleDto.getName());
        currentRole.setDescription(roleDto.getDescription());
        roleRepository.save(currentRole);

        return ResponseEntity.ok(currentRole);
    }

    // DELETE endpoint for permissions
    @DeleteMapping("/permissions/{permissionId}")
    public ResponseEntity<?> deletePermission(@PathVariable int permissionId) {
        Permission currentPermission = permissionRepository.findById(permissionId).orElse(null);
        if (currentPermission == null) {
            return ResponseEntity.status(404).body("Permission not found.");
        }

        permissionRepository.deleteById(permissionId);
        return ResponseEntity.status(204).build(); // No Content
    }

    // DELETE endpoint for roles
    @DeleteMapping("/roles/{roleId}")
    public ResponseEntity<?> deleteRole(@PathVariable int roleId) {
        Role currentRole = roleRepository.findById(roleId).orElse(null);
        if (currentRole == null) {
            return ResponseEntity.status(404).body("Role not found.");
        }

        roleRepository.deleteById(roleId);
        return ResponseEntity.status(204).build(); // No Content
    }

}

