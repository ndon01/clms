package com.teamiq.api.authentication.registration.service;

import com.teamiq.api.authentication.passwords.service.PlainTextPasswordToHashedPasswordService;
import com.teamiq.api.authentication.registration.domain.dtos.RegistrationDTO;
import com.teamiq.api.authentication.registration.domain.exceptions.InvalidRegistrationRequestException;
import com.teamiq.api.authentication.registration.domain.exceptions.UserAlreadyExistsException;
import com.teamiq.api.authentication.registration.domain.projections.RegistrationProjection;
import com.teamiq.api.common.util.emails.EmailValidatorUtil;
import com.teamiq.api.common.util.passwords.PasswordValidatorUtil;
import com.teamiq.api.users.User;
import com.teamiq.api.users.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final UserRepository userRepository;
    private final PlainTextPasswordToHashedPasswordService plainTextPasswordToHashedPasswordService;
    private final RegisteredUserEventPublicationService registeredUserEventPublicationService;

    public void register(RegistrationDTO registrationDTO) {
        boolean isRegistrationValid = true;
        InvalidRegistrationRequestException invalidRegistrationRequestException = new InvalidRegistrationRequestException("Invalid Registration Response from the Client");

        // validate fields
        if (!EmailValidatorUtil.validate(registrationDTO.getEmailAddress())) {
            isRegistrationValid = false;
            invalidRegistrationRequestException.addInvalidKey("emailAddress", "Email address is invalid.");
        }

        if (!PasswordValidatorUtil.validate(registrationDTO.getPassword())) {
            isRegistrationValid = false;
            invalidRegistrationRequestException.addInvalidKey("password", "Password is invalid.");
        }

        // return if invalid
        if (!isRegistrationValid) {
            throw invalidRegistrationRequestException;
        }

        // check if email is in use
        User user = userRepository.getByEmailAddress(registrationDTO.getEmailAddress()).orElse(null);
        if (user != null) {
            throw new UserAlreadyExistsException("User with email address " + registrationDTO.getEmailAddress() + " already exists.");
        }

        // create new user
        user = new User();
        user.setEmailAddress(registrationDTO.getEmailAddress());
        user.setPasswordHash(plainTextPasswordToHashedPasswordService.convert(registrationDTO.getPassword()));
        userRepository.saveAndFlush(user);

        // send user registration event
        registeredUserEventPublicationService.publish(user);
    }
}


