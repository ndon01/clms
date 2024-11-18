package com.clms.api.authentication.passwords.services;

import com.clms.api.authentication.api.entity.AuthenticationProfile;
import com.clms.api.authentication.api.entity.AuthenticationProfileRepository;
import com.clms.api.common.util.passwords.PasswordValidatorUtil;
import com.clms.api.users.api.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PasswordUpdateService {
    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final PasswordHashingComponent passwordHashingComponent;

    public void updatePassword(User user, String currentPassword, String newPassword) {

        AuthenticationProfile authenticationProfile = authenticationProfileRepository.getByUsername(user.getUsername()).orElse(null);
        if (authenticationProfile == null) {
            throw new RuntimeException("User with username " + user.getUsername() + " does not exist.");
        }
        if(!passwordHashingComponent.match(currentPassword, authenticationProfile.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect.");
        }
        if(passwordHashingComponent.match(newPassword, authenticationProfile.getPasswordHash())) {
            throw new RuntimeException("New password cannot be the same as the old password.");
        }
        if(!PasswordValidatorUtil.validate(newPassword))
        {
            throw new RuntimeException("Password is invalid.");
        }

        authenticationProfile.setPasswordHash(passwordHashingComponent.hash(newPassword));
    }
}
