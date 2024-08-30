package com.clms.api.authentication.registration.service;

import com.clms.api.common.domain.UserRegisteredEvent;
import com.clms.api.users.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegisteredUserEventPublicationService {
    public final ApplicationEventPublisher eventPublisher;
    public void publish(User user) {
        eventPublisher.publishEvent(new UserRegisteredEvent(user.getId()));
    }
}
