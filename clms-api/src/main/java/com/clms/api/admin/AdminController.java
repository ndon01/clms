package com.clms.api.admin;

import com.clms.api.admin.users.updateUser.AdminUserService;
import com.clms.api.authentication.AuthenticationService;
import com.clms.api.authentication.RegistrationService;
import com.clms.api.authorization.RoleUpdateService;
import com.clms.api.authorization.Role;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.users.UserService;
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
    @GetMapping("/users")
    public List<UserProjection> getUsers() {
        return userService.getUsers().stream().map(userService::convertToUserProjection).toList();
    }
    @PostMapping("/users/createUser")
    public ResponseEntity<?> createUser(@RequestBody UserCreationDTO user){
        int id = userService.createUserWithUsername(user.getUsername());
        authenticationService.createAuthenticationProfile(user.getUsername(), user.getPassword(), id);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/users/updateUser/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") int userId, @RequestBody UserProjection userProjection){
        adminUserService.updateUser(userId, userProjection);
        return ResponseEntity.status(200).build();
    }

    @PostMapping("/authorization/roles/createRole")
    public ResponseEntity<?> createRole(){
        return ResponseEntity.status(201).build();
    }

    @PostMapping("/authorization/roles/updateRole/{id}")
    public ResponseEntity<?> updateRole(@PathVariable("id") int roleId, @RequestBody Role role) {
        roleUpdateService.updateRole(roleId, role);
        return ResponseEntity.status(201).build();
    }


    @Data
    public class UserCreationDTO{
        private String username;
        private String password;
    }



}
