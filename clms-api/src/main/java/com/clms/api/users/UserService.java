package com.clms.api.users;

import com.clms.api.authorization.Permission;
import com.clms.api.authorization.Role;
import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.users.core.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.*;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public boolean doesUserExistByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public int createUserWithUsername(String username) {
        User user = userRepository.getByUsername(username).orElse(null);
        if (user != null) {
            throw new RuntimeException("User already exists with username: " + username);
        }
        user = new User();
        user.setUsername(username);
        user = userRepository.save(user);
        return user.getId();
    }


    public Optional<User> getUserByUsername(String username) {
        return userRepository.getByUsername(username);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public List<User> getUsers() {
        return userRepository.getUsers();
    }

    public UserProjection convertToUserProjection(User user) {
        UserProjection userProjection = new UserProjection();
        userProjection.setId(user.getId());
        userProjection.setUsername(user.getUsername());
        userProjection.setPermissions(user.getPermissions());
        Set<Role> roles = user.getRoles();
        roles.forEach(role -> {
            role.getPermissions().forEach(permission -> {
                userProjection.getPermissions().add(permission);
            });
            role.setPermissions(null);
        });
        userProjection.setRoles(roles);
        return userProjection;
    }


}
