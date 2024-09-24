package com.clms.api.common.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.clms.api.common.domain.User;
import com.clms.api.common.security.SecurityApplicationProperties;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.users.UserService;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationHttpFilter implements Filter {

    private final SecurityApplicationProperties securityApplicationProperties;
    private final UserService userService;

       @Override
    public void doFilter(jakarta.servlet.ServletRequest servletRequest, jakarta.servlet.ServletResponse servletResponse, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // Try to get the token from the Authorization header
        String token = extractTokenFromHeader(request);

        // If token is not in the Authorization header, check the cookies
        if (token == null) {
            token = extractTokenFromCookies(request);
        }

        // If a token was found, try to verify it and set the user context
        if (token != null) {
            try {
                // Verify and decode the JWT token
                Algorithm algorithm = Algorithm.HMAC256(securityApplicationProperties.getAccessToken().getSecret());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(token);

                // Extract user ID from the token
                int userId = decodedJWT.getClaim("id").asInt();

                // Retrieve user details
                Optional<User> userOptional = userService.getUserById(userId);

                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    CurrentUserContextHolder.setCurrentUser(user);
                    log.info("User authenticated: {}", user);
                }
            } catch (JWTVerificationException e) {
                log.error("JWT verification failed: {}", e.getMessage());

            }
        } else {
            log.warn("Authorization token missing in header or cookies");
        }

        // Continue with the filter chain
        chain.doFilter(request, response);
    }

    private String extractTokenFromHeader(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7); // Extract token from "Bearer <token>"
        }
        return null;
    }

    private String extractTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("Authorization".equals(cookie.getName())) {
                    return cookie.getValue(); // Return the token from the Authorization cookie
                }
            }
        }
        return null;
    }
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialization required for this filter
    }

    @Override
    public void destroy() {
        // No resources to clean up
    }
}
