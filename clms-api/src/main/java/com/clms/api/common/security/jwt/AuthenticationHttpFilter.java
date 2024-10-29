package com.clms.api.common.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.clms.api.authentication.AuthenticationService;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.common.security.SecurityApplicationProperties;
import com.clms.api.users.UserService;
import com.clms.api.users.api.User;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.Base64Utils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class AuthenticationHttpFilter implements Filter {

    private final AuthenticationService authenticationService;
    private final SecurityApplicationProperties securityApplicationProperties;
    private final UserService userService;

    @Override
    public void doFilter(jakarta.servlet.ServletRequest servletRequest, jakarta.servlet.ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // If no Authorization header, check for JWT token in cookies
        String token = extractTokenFromCookies(request);
        if (token != null) {
            authenticateWithJwt(token);
        } else {
            // Extract the Authorization header
            String authorizationHeader = request.getHeader("Authorization");

            if (authorizationHeader != null) {
                if (authorizationHeader.startsWith("Bearer ")) {
                    // JWT Authentication
                    String token2 = authorizationHeader.substring(7);
                    authenticateWithJwt(token2);
                } else if (authorizationHeader.startsWith("Basic ")) {
                    // Basic Authentication
                    attemptBasicAuthentication(authorizationHeader, response);
                }
            }
        }

        // Continue with the filter chain, regardless of authentication result
        chain.doFilter(request, response);
    }


    private boolean authenticateWithJwt(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(securityApplicationProperties.getAccessToken().getSecret());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);

            int userId = decodedJWT.getClaim("id").asInt();
            Optional<User> userOptional = userService.getUserById(userId);

            if (userOptional.isPresent()) {
                CurrentUserContextHolder.setCurrentUser(userOptional.get());
                return true;
            }
        } catch (JWTVerificationException e) {
            log.error("JWT verification failed: {}", e.getMessage());
        }
        return false;
    }

    private boolean attemptBasicAuthentication(String authorizationHeader, HttpServletResponse response) {
        String credentials = authorizationHeader.substring(6);
        byte[] decodedCredentials = Base64Utils.decodeFromString(credentials);
        String decodedString = new String(decodedCredentials, StandardCharsets.UTF_8);

        String[] values = decodedString.split(":", 2);
        if (values.length == 2) {
            String username = values[0];
            String password = values[1];

            String token = authenticationService.loginForToken(username, password);
            if (token != null) {
                Optional<User> user = userService.getUserByUsername(username);
                if (user.isPresent()) {
                    CurrentUserContextHolder.setCurrentUser(user.get());
                    response.addHeader("Authorization", "Bearer " + token); // Add JWT token to response
                    return true;
                }
            }
        }
        return false;
    }

    private String extractTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("Authorization".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialization required
    }

    @Override
    public void destroy() {
        // No cleanup required
    }
}
