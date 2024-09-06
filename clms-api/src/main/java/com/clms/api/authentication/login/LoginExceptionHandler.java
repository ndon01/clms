package com.clms.api.authentication.login;

import com.clms.api.authentication.registration.domain.exceptions.InvalidRegistrationRequestException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

public class LoginExceptionHandler extends ResponseEntityExceptionHandler
{
    @ExceptionHandler(InvalidCredentialsException.class)
    ProblemDetail handle(InvalidCredentialsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), e.getMessage());
        problemDetail.setTitle("Invalid Credentials");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }
}
