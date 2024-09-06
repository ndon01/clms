package com.clms.api.authentication.registration.services;

import com.clms.api.authentication.domain.AuthenticationProfile;
import com.clms.api.common.events.AuthenticationProfileRegisteredEvent;
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
