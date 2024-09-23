package com.clms.api.users;

import com.clms.api.common.domain.User;
import com.clms.api.common.domain.UserProjection;
import com.clms.api.users.core.UserRepository;
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
