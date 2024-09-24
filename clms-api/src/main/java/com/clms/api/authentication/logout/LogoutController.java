package com.clms.api.authentication.logout;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/logout")
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
