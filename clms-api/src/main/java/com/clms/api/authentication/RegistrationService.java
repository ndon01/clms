package com.clms.api.authentication;

import com.clms.api.authentication.api.entity.AuthenticationProfile;
import com.clms.api.authentication.api.entity.AuthenticationProfileRepository;
import com.clms.api.authentication.passwords.services.PlainTextPasswordToHashedPasswordService;
import com.clms.api.authentication.registration.RegistrationDTO;
import com.clms.api.authentication.registration.exceptions.InvalidRegistrationRequestException;
import com.clms.api.authentication.registration.services.RegisteredUserEventPublicationService;
import com.clms.api.common.util.passwords.PasswordValidatorUtil;
import com.clms.api.users.UserRepository;
import com.clms.api.users.UserService;
import com.clms.api.users.api.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegistrationService {

    private final UserService userService;
    private final PlainTextPasswordToHashedPasswordService plainTextPasswordToHashedPasswordService;
    private final RegisteredUserEventPublicationService registeredUserEventPublicationService;
    private final AuthenticationProfileRepository authenticationProfileRepository;
    private final UserRepository userRepository;

    public void register(RegistrationDTO registrationDTO) {
        boolean isRegistrationValid = true;
        InvalidRegistrationRequestException invalidRegistrationRequestException = new InvalidRegistrationRequestException("Invalid Registration Response from the Client");

        if (!PasswordValidatorUtil.validate(registrationDTO.getPassword())) {
            isRegistrationValid = false;
            invalidRegistrationRequestException.addInvalidKey("password", "Password is invalid.");
        }

        User user = userRepository.findByUsername(registrationDTO.getUsername());
        if (user != null) {
            isRegistrationValid = false;
            invalidRegistrationRequestException.addInvalidKey("username ", "Username is already in use.");
        }


        AuthenticationProfile authenticationProfile = authenticationProfileRepository.getByUsername(registrationDTO.getUsername()).orElse(null);
        if (userService.doesUserExistByUsername(registrationDTO.getUsername()) || authenticationProfile != null) {
            isRegistrationValid = false;
            invalidRegistrationRequestException.addInvalidKey("username", "Username is already in use.");
        }

        // return if invalid
        if (!isRegistrationValid) {
            throw invalidRegistrationRequestException;
        }

        user = User.builder()
                .username(registrationDTO.getUsername())
                .build();
        userRepository.save(user);


        authenticationProfile = new AuthenticationProfile();
        authenticationProfile.setUsername(registrationDTO.getUsername());
        authenticationProfile.setPasswordHash(plainTextPasswordToHashedPasswordService.convert(registrationDTO.getPassword()));
        authenticationProfile.setUserId(user.getId());
        authenticationProfileRepository.saveAndFlush(authenticationProfile);

        user.setAuthenticationProfileId(authenticationProfile.getId());
        userRepository.save(user);
        log.info("User registered with username: {}", registrationDTO.getUsername());
    }
}


