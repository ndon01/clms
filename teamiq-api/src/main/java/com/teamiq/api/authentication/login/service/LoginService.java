package com.teamiq.api.authentication.login.service;

import com.teamiq.api.authentication.login.domain.dtos.LoginDto;
import com.teamiq.api.authentication.login.domain.entity.UserSession;
import com.teamiq.api.authentication.login.domain.exceptions.InvalidCredentialsException;
import com.teamiq.api.authentication.login.domain.repository.UserSessionRepository;
import com.teamiq.api.authentication.passwords.service.PlainTextAndHashedPasswordMatchingService;
import com.teamiq.api.users.User;
import com.teamiq.api.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;
    private final PlainTextAndHashedPasswordMatchingService plainTextAndHashedPasswordMatchingService;
    private final UserSessionRepository userSessionRepository;

    public void login(LoginDto loginDto) {
        String emailAddress = loginDto.getEmailAddress();
        String password = loginDto.getPassword();

        User user = userRepository.getByEmailAddress(emailAddress).orElse(null);

        if (user == null) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        boolean isPasswordCorrect = plainTextAndHashedPasswordMatchingService.match(password, user.getPasswordHash());
        if (!isPasswordCorrect) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        UserSession userSession = new UserSession();
        userSession.setUserId(user.getId());
        userSessionRepository.save(userSession);
    }
}
