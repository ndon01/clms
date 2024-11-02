package com.clms.api.authorization.permissions;

import com.clms.api.authorization.Permission;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/authorization/permissions")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Authorization", description = "Endpoints for Authorization")
public class PermissionsController {
    private final PermissionRepository permissionRepository;
    @GetMapping
    public List<Permission> getAllPermissions() {
        return permissionRepository.findAll();
    }

    @GetMapping("/{permissionId}")
    @Operation(parameters = {
            @Parameter(name = "permissionId", description = "The ID of the permission to fetch", required = true)
    })
    public Permission getPermission(@PathVariable int permissionId) {
        return permissionRepository.findById(permissionId).orElse(null);
    }
}
