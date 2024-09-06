package com.clms.api.common.security;

import com.clms.api.common.security.exceptions.UserAuthenticationRequiredException;
import com.clms.api.common.security.exceptions.UserNotAllowedException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

@RestControllerAdvice
public class SecurityControllerAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserAuthenticationRequiredException.class)
    public ProblemDetail handle(UserAuthenticationRequiredException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), e.getMessage());
        problemDetail.setTitle("User Authentication Required");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

    @ExceptionHandler(UserNotAllowedException.class)
    public ProblemDetail handle(UserNotAllowedException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), e.getMessage());
        problemDetail.setTitle("User Not Allowed");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }

}
