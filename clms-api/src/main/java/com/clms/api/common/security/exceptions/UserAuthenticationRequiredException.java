package com.clms.api.common.security.exceptions;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

public class UserAuthenticationRequiredException extends RuntimeException {
    public UserAuthenticationRequiredException() {
        super("User authentication required.");
    }

    public UserAuthenticationRequiredException(String message) {
        super(message);
    }
}
