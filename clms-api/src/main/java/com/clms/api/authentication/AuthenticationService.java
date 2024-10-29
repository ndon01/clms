package com.clms.api.authentication;

import com.clms.api.authentication.domain.AuthenticationProfile;
import com.clms.api.authentication.domain.AuthenticationProfileRepository;
import com.clms.api.authentication.login.LoginService;
import com.clms.api.authentication.passwords.PlainTextPasswordToHashedPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final PlainTextPasswordToHashedPasswordService plainTextPasswordToHashedPasswordService;
    public void createAuthenticationProfile(String username, String password, int userId) {
        AuthenticationProfile authenticationProfile = new AuthenticationProfile();
        authenticationProfile.setUsername(username);
        authenticationProfile.setPasswordHash(plainTextPasswordToHashedPasswordService.convert(password));
        authenticationProfile.setUserId(userId);
        authenticationProfileRepository.saveAndFlush(authenticationProfile);
    }

    private final LoginService loginService;
    public String loginForToken(String username, String password) {
        return loginService.loginForToken(username, password);
    }

}
