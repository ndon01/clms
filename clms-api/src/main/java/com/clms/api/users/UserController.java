package com.clms.api.users;

import com.clms.api.ApiVersionResources;
import com.clms.api.common.domain.AuthenticationProfileRegisteredEvent;
import com.clms.api.common.domain.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.util.privilegedactions.GetResource;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final String ResourcePath = "/user";
    private final String V1ResourcePath = ApiVersionResources.V1 + ResourcePath;

    private final UserService userService;

    @EventListener
    void on(UserRegisteredEvent event) {
        log.info("User registered with userId: {}", event.userId());
    }


    @EventListener
    void on(AuthenticationProfileRegisteredEvent event) {
        log.info("Authentication Profile registered with authenticationProfileId: {}", event.authenticationProfileId());


    }

}
