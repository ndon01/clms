package com.clms.api.users.api.projections.converters;

import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.users.api.User;
import com.clms.api.users.api.projections.UserProjection;
import org.springframework.stereotype.Service;

@Service
public class UserProjectionConverter implements GenericConverter<User, UserProjection> {
    @Override
    public UserProjection convert(User from) {
        return UserProjection.builder()
                .id(from.getId())
                .username(from.getUsername())
                .roles(from.getRoles())
                .permissions(from.getPermissions())
                .build();
    }
}
