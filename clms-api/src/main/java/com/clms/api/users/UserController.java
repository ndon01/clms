package com.teamiq.api.users;

import com.teamiq.api.ApiVersionResources;
import com.teamiq.api.common.domain.UserRegisteredEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
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

}
