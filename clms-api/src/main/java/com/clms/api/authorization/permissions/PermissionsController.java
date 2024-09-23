package com.clms.api.authorization.permissions;

import com.clms.api.authorization.Permission;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/authorization/permissions")
@RequiredArgsConstructor
@Slf4j
public class PermissionsController {
    private final PermissionRepository permissionRepository;
    @GetMapping
    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    @GetMapping("/{permissionId}")
    public Permission getPermission(int permissionId) {
        return permissionRepository.findById(permissionId).orElse(null);
    }
}
