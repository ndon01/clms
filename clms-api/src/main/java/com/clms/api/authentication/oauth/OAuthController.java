package com.clms.api.authentication.oauth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("/api/v1/authentication/oauth")
@RequiredArgsConstructor
@Slf4j
public class OAuthController {
    private final OAuthService oAuthService;

    @GetMapping("/google/url")
    public ResponseEntity<String> getGoogleOAuthUrl() {
        String googleUrl = oAuthService.generateGoogleOAuthUrl();
        log.info("Generated Google OAuth URL: {}", googleUrl);
        return ResponseEntity.ok(googleUrl);
    }

    @GetMapping("/google/callback")
    public ResponseEntity<?> handleGoogleCallback(
            @RequestParam("code") String authorizationCode,
            @RequestParam("state") String state) {
        try {
            log.info("Received Google OAuth callback with code: {}", authorizationCode);
            oAuthService.handleGoogleCallback(authorizationCode);
            return  ResponseEntity.status(301).location(URI.create("/")).build();
        } catch (IOException | GeneralSecurityException e) {
            log.error("Error during Google OAuth callback: {}", e.getMessage());
            return ResponseEntity.status(500).body("Error processing Google callback.");
        }
    }
}
