package com.clms.api.authentication.tokens;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.clms.api.authentication.api.entity.AuthenticationProfile;
import com.clms.api.common.security.SecurityApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationProfileToAccessTokenConverterService {

    private final SecurityApplicationProperties securityApplicationProperties;

    public String convert(AuthenticationProfile authenticationProfile) {
        Algorithm algorithm = Algorithm.HMAC256(securityApplicationProperties.getAccessToken().getSecret()); // Using HMAC with SHA-256

        // Create the JWT token with standard and custom claims
        return JWT.create()
                .withSubject(authenticationProfile.getUsername()) // Standard claim: subject
                .withClaim("id", authenticationProfile.getUserId())   // Custom claim: profile ID
                .withIssuedAt(new Date())                        // Issued at current time
                .withExpiresAt(new Date(System.currentTimeMillis() + securityApplicationProperties.getAccessToken().getExpirationTime())) // Set expiration time
                .sign(algorithm); // Sign the token with the secret key
    }
}
