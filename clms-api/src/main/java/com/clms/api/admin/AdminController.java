package com.clms.api.admin;

import com.clms.api.admin.users.updateUser.AdminUserService;
import com.clms.api.authentication.AuthenticationService;
import com.clms.api.authentication.RegistrationService;
import com.clms.api.authorization.RoleCRUDService;
import com.clms.api.authorization.RoleUpdateService;
import com.clms.api.authorization.Role;
import com.clms.api.users.api.projections.UserProjection;
import com.clms.api.users.UserService;
import com.clms.api.users.api.projections.converters.UserProjectionConverter;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final RegistrationService registrationService;
    private final AuthenticationService authenticationService;
    private final AdminUserService adminUserService;
    private final RoleUpdateService roleUpdateService;
    private final RoleCRUDService roleCRUDService;
    private final UserProjectionConverter userProjectionConverterService;

    @GetMapping("/users")
    public List<UserProjection> getUsers() {
        return userService.getUsers().stream().map(userProjectionConverterService::convert).toList();
    }
    @PostMapping("/users/createUser")
    @Transactional
    public ResponseEntity<?> createUser(@RequestBody NewUserRequest newUserRequest){
        int id = userService.createUserWithUsername(newUserRequest.getUsername());
        authenticationService.createAuthenticationProfile(newUserRequest.getUsername(), newUserRequest.getPassword(), id);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/users/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") int userId, @RequestBody UserProjection userProjection){
        adminUserService.updateUser(userId, userProjection);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/authorization/roles/createRole")
    public ResponseEntity<?> createRole(@RequestBody Role role){
        Role createdRole = new Role();
        createdRole.setName(role.getName());
        createdRole.setDescription(role.getDescription());
        createdRole.setPermissions(role.getPermissions());
        roleCRUDService.createRole(createdRole);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/authorization/roles/updateRole/{id}")
    public ResponseEntity<?> updateRole(@PathVariable("id") int roleId, @RequestBody Role role) {
        roleUpdateService.updateRole(roleId, role);
        return ResponseEntity.status(201).build();
    }


}


@Data
class NewUserRequest {
    private String username;
    private String password;
}
