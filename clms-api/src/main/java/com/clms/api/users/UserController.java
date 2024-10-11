package com.clms.api.users;

import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.common.security.currentUser.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserProjection> getUsersV1(@CurrentUser User user) {
        return userService.getUsers()
                .stream()
                .map(userService::convertToUserProjection)
                .toList();
    }

    @GetMapping("/client")
    public User getClient(@CurrentUser User user) {
        return user;
    }

    @GetMapping("/{userId}")
    public User getUserByIdV1(@CurrentUser User user, @PathVariable int userId) {
        log.info("Fetching user with ID: {}", userId);
        return userService.getUserById(userId)
                .orElse(null);  // Handle null case appropriately
    }

}
