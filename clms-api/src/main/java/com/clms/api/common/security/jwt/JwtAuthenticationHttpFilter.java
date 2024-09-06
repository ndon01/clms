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

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
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
                    log.info("{}", user);
                }
            } catch (JWTVerificationException e) {
                log.error("JWT verification failed: {}", e.getMessage());
                // CURRENTLY: this will just continue and the CurrentUserContextHolder will be empty
                // todo: consider returning a 401 Unauthorized response and have the client re-authenticate
            }
        } else {
            log.warn("Authorization header missing or invalid");
        }

        // Continue with the filter chain
        chain.doFilter(request, response);
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