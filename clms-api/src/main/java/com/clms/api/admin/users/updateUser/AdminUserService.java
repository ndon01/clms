package com.clms.api.admin.users.updateUser;

import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.users.UserSearchService;
import com.clms.api.users.UserService;
import com.clms.api.users.UserUpdateService;
import com.clms.api.users.core.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserSearchService userSearchService;
    private final UserUpdateService userUpdateService;
    public void updateUser(int userId, UserProjection userProjection) {
        User user = userSearchService.getUserByUserId(userId);
        if (user == null) {
            throw new RuntimeException("User with id " + userId + " not found.");
        }

        user.setUsername(userProjection.getUsername());
        user.setRoles(userProjection.getRoles());
        user.setPermissions(userProjection.getPermissions());

        userUpdateService.updateUser(user);
    }
}
