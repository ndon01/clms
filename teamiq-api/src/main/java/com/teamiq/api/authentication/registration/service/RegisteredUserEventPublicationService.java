package com.teamiq.api.authentication.registration.service;

import com.teamiq.api.common.domain.UserRegisteredEvent;
import com.teamiq.api.users.User;
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
