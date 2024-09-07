package com.clms.api.users.core;

import com.clms.api.ApiVersionResources;
import com.clms.api.common.events.AuthenticationProfileRegisteredEvent;
import com.clms.api.common.domain.User;
import com.clms.api.common.events.UserRegisteredEvent;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.users.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users/me")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping
    @RequiresUser
    public User getMeV1(@CurrentUser User user) {
        return user;
    }
}
