package com.clms.api.authentication.login;

import com.clms.api.ApiVersionResources;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final String ResourcePath = "/authentication";
    private final String V1ResourcePath = ApiVersionResources.V1 + ResourcePath;

    private final LoginService loginService;

    @PostMapping(V1ResourcePath + "/login")
    public ResponseEntity<?> LoginUserV1(@RequestBody LoginDTO loginDTO) {
        String token = loginService.loginForToken(loginDTO.getUsername(), loginDTO.getPassword());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        return ResponseEntity.status(201).headers(headers).build();
    }
}
