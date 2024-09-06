package com.clms.api.authentication.login;

import com.clms.api.authentication.core.authentication_profiles.AuthenticationProfile;
import com.clms.api.authentication.core.authentication_profiles.AuthenticationProfileRepository;
import com.clms.api.authentication.passwords.service.PlainTextAndHashedPasswordMatchingService;
import com.clms.api.authentication.tokens.AuthenticationProfileToAccessTokenConverterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final PlainTextAndHashedPasswordMatchingService plainTextAndHashedPasswordMatchingService;
    private final AuthenticationProfileToAccessTokenConverterService authenticationProfileToAccessTokenConverterService;
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
}
