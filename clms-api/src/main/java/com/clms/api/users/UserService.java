package com.clms.api.users;

import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
            throw new RuntimeException("User with username " + username + " already exists.");
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
