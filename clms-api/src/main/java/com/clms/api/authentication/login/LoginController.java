package com.clms.api.authentication.login;

import com.clms.api.ApiVersionResources;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/authentication/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @PostMapping
    public ResponseEntity<?> LoginUserV1(@RequestBody LoginDTO loginDTO) {
        String token = loginService.loginForToken(loginDTO.getUsername(), loginDTO.getPassword());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        return ResponseEntity.status(201).headers(headers).build();
    }
}
