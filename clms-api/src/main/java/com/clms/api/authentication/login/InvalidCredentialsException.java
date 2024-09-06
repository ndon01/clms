package com.clms.api.authentication.login;

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }

}
