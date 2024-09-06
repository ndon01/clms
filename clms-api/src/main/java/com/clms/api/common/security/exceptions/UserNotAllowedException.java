package com.clms.api.common.security.exceptions;

public class UserNotAllowedException extends RuntimeException {
    public UserNotAllowedException() {
        super("User is not allowed access to this Resource.");
    }

    public UserNotAllowedException(String message) {
        super(message);
    }
}
