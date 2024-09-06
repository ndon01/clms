package com.clms.api.authentication.registration.service;

import com.clms.api.authentication.core.authentication_profiles.AuthenticationProfile;
import com.clms.api.common.domain.AuthenticationProfileRegisteredEvent;
import com.clms.api.common.domain.UserRegisteredEvent;
import com.clms.api.users.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisteredUserEventPublicationService {
    public final ApplicationEventPublisher eventPublisher;
    public void publish(AuthenticationProfile authenticationProfile) {
        eventPublisher.publishEvent(new AuthenticationProfileRegisteredEvent(authenticationProfile.getId()));
    }
}
