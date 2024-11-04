package com.clms.api.authentication.login;

import com.clms.api.authentication.domain.AuthenticationProfile;
import com.clms.api.authentication.domain.AuthenticationProfileRepository;
import com.clms.api.authentication.passwords.PlainTextAndHashedPasswordMatchingService;
import com.clms.api.authentication.tokens.AuthenticationProfileToAccessTokenConverterService;
import com.clms.api.users.UserSearchService;
import com.clms.api.users.api.User;
import com.clms.api.users.api.projections.converters.UserProjectionConverter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final PlainTextAndHashedPasswordMatchingService plainTextAndHashedPasswordMatchingService;
    private final AuthenticationProfileToAccessTokenConverterService authenticationProfileToAccessTokenConverterService;
    private final UserProjectionConverter userProjectionConverter;
    private final UserSearchService userSearchService;

    public AuthenticationProfile loginForAuthenticationProfile(String username, String password) {
        AuthenticationProfile authenticationProfile = authenticationProfileRepository.getByUsername(username).orElse(null);
        if (authenticationProfile == null) {
            throw new InvalidCredentialsException("Invalid Credentials");
        }

        if (!plainTextAndHashedPasswordMatchingService.match(password, authenticationProfile.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid Credentials");
        }

        return authenticationProfile;
    }

    public String loginForToken(String username, String password) {
        AuthenticationProfile authenticationProfile = loginForAuthenticationProfile(username, password);
        return authenticationProfileToAccessTokenConverterService.convert(authenticationProfile);
    }

    private static final int expirationInSeconds = 60 * 60 * 24 * 7;

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        AuthenticationProfile authenticationProfile = loginForAuthenticationProfile(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
        String token = authenticationProfileToAccessTokenConverterService.convert(authenticationProfile);
        User user = userSearchService.getUserByUserId(authenticationProfile.getUserId());

        ServletRequestAttributes ra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (ra != null) {
            HttpServletResponse response = ra.getResponse();

            ResponseCookie cookie = ResponseCookie.from("Authorization", token)
                    .httpOnly(true)
                    .maxAge(expirationInSeconds)
                    .path("/")
                    .sameSite("Strict")
                    .build();

            response.addHeader("Set-Cookie", cookie.toString());
        }

        return LoginResponseDTO.builder()
                        .accessToken(token)
                        .user(userProjectionConverter.convert(user))
                        .build();
    }
}
