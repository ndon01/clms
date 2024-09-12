package com.clms.api.admin;

import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.common.security.requireUserGroup.RequiresUserGroup;
import com.clms.api.common.security.requiresUser.RequiresUser;
import com.clms.api.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    public List<UserProjection> getUsers() {
        return userService.getUsers().stream().map(userService::convertToUserProjection).toList();

    }

}
