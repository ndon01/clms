package com.clms.api.authentication.login;

import com.clms.api.users.api.projections.converters.UserProjectionConverter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/authentication/login")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for user authentication and registration")
public class LoginController {

    private final LoginService loginService;
    private final UserProjectionConverter userProjectionConverter;

    @PostMapping
    public ResponseEntity<LoginResponseDTO> LoginUserV1(@RequestBody LoginRequestDTO loginDTO) {
        return ResponseEntity.ok(loginService.login(loginDTO));
    }
}

