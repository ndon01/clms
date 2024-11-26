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
    private final OAuthConfiguration oAuthConfiguration;

    @GetMapping("/google/enabled")
    public ResponseEntity<Boolean> isGoogleOAuthEnabled() {
        return ResponseEntity.ok(oAuthConfiguration.isEnabled() == true);
    }

    @GetMapping("/google/url")
    public ResponseEntity<String> getGoogleOAuthUrl() {
        if (!oAuthConfiguration.isEnabled()) {
            return ResponseEntity.badRequest().body("Google OAuth is not enabled.");
        }
        String googleUrl = oAuthService.generateGoogleOAuthUrl();
        log.info("Generated Google OAuth URL: {}", googleUrl);
        return ResponseEntity.ok(googleUrl);
    }

    @GetMapping("/google/callback")
    public ResponseEntity<?> handleGoogleCallback(
            @RequestParam("code") String authorizationCode,
            @RequestParam("state") String state) {
        if (!oAuthConfiguration.isEnabled()) {
            return ResponseEntity.badRequest().body("Google OAuth is not enabled.");
        }
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
