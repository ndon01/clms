package com.teamiq.api.authentication.login.config;

import com.teamiq.api.authentication.login.domain.exceptions.InvalidCredentialsException;
import com.teamiq.api.authentication.registration.domain.exceptions.InvalidRegistrationRequestException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

@RestControllerAdvice
public class LoginExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(InvalidCredentialsException.class)
    ProblemDetail handle(InvalidCredentialsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(400), e.getMessage());
        problemDetail.setTitle("Invalid Credentials");
        problemDetail.setProperty("timestamp", Instant.now());

        return problemDetail;
    }
}
