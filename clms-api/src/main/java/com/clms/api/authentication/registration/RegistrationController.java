package com.clms.api.authentication.registration;

import com.clms.api.authentication.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/authentication/register")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<RegistrationProjection> RegisterUserV1(@RequestBody RegistrationDTO registrationDTO) {
        registrationService.register(registrationDTO);
        return ResponseEntity.status(201).build();
    }
}

