package com.clms.api.users;

import com.clms.api.authentication.registration.exceptions.UserAlreadyExistsException;
import com.clms.api.authorization.Permission;
import com.clms.api.authorization.Role;
import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.users.core.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
            throw new UserAlreadyExistsException("User with username " + username + " already exists.");
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
        userProjection.setRoles(user.getRoles());
        userProjection.setPermissions(user.getPermissions());
        return userProjection;
    }


}
