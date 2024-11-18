package com.clms.api.users.settings;

import com.clms.api.authentication.api.entity.AuthenticationProfile;
import com.clms.api.authentication.api.entity.AuthenticationProfileRepository;
import com.clms.api.authentication.api.services.PasswordHashingComponent;
import com.clms.api.common.util.passwords.PasswordValidatorUtil;
import com.clms.api.users.api.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SettingsService
{
    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final PasswordHashingComponent passwordHashingComponent;

    public void updatePassword(User user, String newPassword) {
        AuthenticationProfile authenticationProfile = authenticationProfileRepository.getByUsername(user.getUsername()).orElse(null);
        if (authenticationProfile == null) {
            throw new RuntimeException("User with username " + user.getUsername() + " does not exist.");
        }
        if(passwordHashingComponent.match(newPassword, authenticationProfile.getPasswordHash())) {
            throw new RuntimeException("New password cannot be the same as the old password.");
        }
        /* add strength checks */
        if(!PasswordValidatorUtil.validate(newPassword))
        {
            throw new RuntimeException("Password is invalid.");
        }

        authenticationProfile.setPasswordHash(passwordHashingComponent.hash(newPassword));
    }
}
