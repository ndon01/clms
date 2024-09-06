package com.clms.api.authentication.registration;

import com.clms.api.authentication.registration.exceptions.InvalidRegistrationRequestException;
import com.clms.api.authentication.registration.exceptions.UserAlreadyExistsException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

@RestControllerAdvice
public class RegistrationExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(InvalidRegistrationRequestException.class)
    ProblemDetail handle(InvalidRegistrationRequestException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(400), e.getMessage());
        problemDetail.setTitle("Invalid Registration Request");
        problemDetail.setProperty("timestamp", Instant.now());

        problemDetail.setProperty("keyErrors", e.getInvalidKeys());
        return problemDetail;
    }


    @ExceptionHandler(UserAlreadyExistsException.class)
    ProblemDetail handle(UserAlreadyExistsException e) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(409), e.getMessage());
        problemDetail.setTitle("User Already Exists");
        problemDetail.setProperty("timestamp", Instant.now());
        return problemDetail;
    }
}
