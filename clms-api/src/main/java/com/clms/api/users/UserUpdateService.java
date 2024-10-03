package com.clms.api.users;

import com.clms.api.common.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserUpdateService {
    private  final UserRepository userRepository;
    public void updateUser(User user) {
        userRepository.save(user);
    }
}
