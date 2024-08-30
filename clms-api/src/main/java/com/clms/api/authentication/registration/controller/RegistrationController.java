package com.clms.api.authentication.registration.controller;

import com.clms.api.ApiVersionResources;
import com.clms.api.authentication.registration.domain.dtos.RegistrationDTO;
import com.clms.api.authentication.registration.domain.projections.RegistrationProjection;
import com.clms.api.authentication.registration.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RegistrationController {
    private final String ResourcePath = "/authentication";
    private final String V1ResourcePath = ApiVersionResources.V1 + ResourcePath;

    private final RegistrationService registrationService;

    @PostMapping(V1ResourcePath + "/register")
    public ResponseEntity<RegistrationProjection> RegisterUserV1(@RequestBody RegistrationDTO registrationDTO) throws InterruptedException {
        registrationService.register(registrationDTO);
        return ResponseEntity.status(201).build();
    }
}

