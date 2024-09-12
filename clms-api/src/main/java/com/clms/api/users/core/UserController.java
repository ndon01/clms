package com.clms.api.users.core;

import com.clms.api.ApiVersionResources;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.common.events.AuthenticationProfileRegisteredEvent;
import com.clms.api.common.domain.User;
import com.clms.api.common.events.UserRegisteredEvent;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.common.security.currentUser.CurrentUser;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.users.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    @RequiresUser
    @Transactional
    public UserProjection getMeV1(@CurrentUser User user) {
        if (user == null) {
            return null;
        }

        return userService.convertToUserProjection(user);
    }

    @GetMapping
    @RequiresUser
    public List<UserProjection> getUsersV1(@CurrentUser User user) {
        return userService.getUsers().stream().map(userService::convertToUserProjection).toList();
    }

    @GetMapping("/{id}")
    @RequiresUser
    public User getUserByIdV1(@CurrentUser User user, @PathVariable int id) {
        User currentUser = CurrentUserContextHolder.getCurrentUser();
        return userService.getUserById(id).orElse(null);
    }
}
