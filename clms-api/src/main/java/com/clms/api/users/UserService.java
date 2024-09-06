package com.clms.api.users;

import com.clms.api.common.domain.User;
import com.clms.api.users.core.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
