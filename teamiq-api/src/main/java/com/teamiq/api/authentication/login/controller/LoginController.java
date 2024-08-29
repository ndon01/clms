package com.teamiq.api.authentication.login.controller;

import com.teamiq.api.ApiVersionResources;
import com.teamiq.api.authentication.login.domain.dtos.LoginDto;
import com.teamiq.api.authentication.login.domain.projections.LoginProjection;
import com.teamiq.api.authentication.login.service.LoginService;
import com.teamiq.api.authentication.registration.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final String ResourcePath = "/authentication";
    private final String V1ResourcePath = ApiVersionResources.V1 + ResourcePath;

    private final LoginService loginService;


    @PostMapping(V1ResourcePath + "/login")
    public ResponseEntity<LoginProjection> LoginUserV1(@RequestBody LoginDto loginDto) {
        loginService.login(loginDto);
        return ResponseEntity.status(200).build();
    }

}
