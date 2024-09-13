package com.clms.api.admin;

import com.clms.api.authentication.AuthenticationService;
import com.clms.api.authentication.RegistrationService;
import com.clms.api.authentication.registration.RegistrationDTO;
import com.clms.api.common.domain.User;
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
    @Data
    public class UserCreationDTO{
        private String username;
        private String password;
    }



}
