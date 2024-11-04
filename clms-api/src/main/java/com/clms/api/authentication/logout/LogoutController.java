package com.clms.api.authentication.logout;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/logout")
@Tag(name = "Authentication", description = "Endpoints for user authentication and registration")
public class LogoutController {
    @PostMapping
    public ResponseEntity<?> logout() {
        long expirationInSeconds = -3600;

        ResponseCookie cookie = ResponseCookie.from("Authorization", "")
                .httpOnly(true)
                .maxAge(1)
                .path("/")
                .sameSite("Strict")
                .build();

        return ResponseEntity.status(200)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }
}
