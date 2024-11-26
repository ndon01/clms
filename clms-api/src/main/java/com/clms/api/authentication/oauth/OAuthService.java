package com.clms.api.authentication.oauth;

import com.clms.api.authentication.api.entity.AuthenticationProfile;
import com.clms.api.authentication.api.entity.AuthenticationProfileRepository;
import com.clms.api.users.UserRepository;
import com.clms.api.users.api.User;
import com.clms.api.authentication.tokens.AuthenticationProfileToAccessTokenConverterService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService {
    private final OAuthConfiguration oAuthConfiguration;
    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final UserRepository userRepository;
    private final AuthenticationProfileToAccessTokenConverterService authenticationProfileToAccessTokenConverterService;

    public String generateGoogleOAuthUrl() {
        return UriComponentsBuilder.fromHttpUrl("https://accounts.google.com/o/oauth2/v2/auth")
                .queryParam("client_id", oAuthConfiguration.getClientId())
                .queryParam("redirect_uri", oAuthConfiguration.getRedirectUri())
                .queryParam("response_type", "code")
                .queryParam("scope", "openid email profile")
                .queryParam("state", "randomStateString") // Use an actual state value for CSRF protection
                .toUriString();
    }

    public void handleGoogleCallback(String authorizationCode) throws IOException, GeneralSecurityException {
        // Exchange the authorization code for tokens
        TokenResponse tokenResponse = new GoogleAuthorizationCodeTokenRequest(
                new NetHttpTransport(),
                new GsonFactory(),
                "https://oauth2.googleapis.com/token",
                oAuthConfiguration.getClientId(),
                oAuthConfiguration.getClientSecret(),
                authorizationCode,
                oAuthConfiguration.getRedirectUri()
        ).execute();

        String idToken = (String) tokenResponse.get("id_token");
        this.registerWithGoogle(idToken);
    }

    public void registerWithGoogle(String idToken) throws GeneralSecurityException, IOException {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(oAuthConfiguration.getClientId()))
                .build();

        GoogleIdToken googleIdToken = verifier.verify(idToken);
        if (googleIdToken != null) {
            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            Optional<AuthenticationProfile> existingProfile = authenticationProfileRepository.findByGoogleId(googleId);
            if (existingProfile.isPresent()) {
                log.info("User already exists, returning existing token.");
                String token = authenticationProfileToAccessTokenConverterService.convert(existingProfile.get());
                this.setAuthorizationCookie(token);
                return;
            }

            var ap = AuthenticationProfile.builder()
                    .googleId(googleId)
                    .build();
            authenticationProfileRepository.saveAndFlush(ap);

            var user = User.builder()
                    .authenticationProfileId(ap.getId())
                    .build();

            userRepository.saveAndFlush(user);

            ap.setUserId(user.getId());
            authenticationProfileRepository.saveAndFlush(ap);

            String token = authenticationProfileToAccessTokenConverterService.convert(ap);

            this.setAuthorizationCookie(token);
        } else {
            throw new IllegalArgumentException("Invalid ID token");
        }
    }

    private void setAuthorizationCookie(String token) {
        ServletRequestAttributes ra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (ra != null) {
            HttpServletResponse response = ra.getResponse();
            if (response != null) {
                ResponseCookie cookie = ResponseCookie.from("Authorization", token)
                        .httpOnly(true)
                        .maxAge(60 * 60 * 24 * 7) // 7 days
                        .path("/")
                        .sameSite("Strict")
                        .build();
                response.addHeader("Set-Cookie", cookie.toString());
            }
        }
    }
}
