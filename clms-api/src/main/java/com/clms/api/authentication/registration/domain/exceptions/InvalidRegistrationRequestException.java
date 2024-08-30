package com.clms.api.authentication.registration.domain.exceptions;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class InvalidRegistrationRequestException extends RuntimeException {

    private Map<String, String> invalidKeys = new HashMap<>();

    public InvalidRegistrationRequestException(String message) {
        super(message);
    }

    public void addInvalidKey(String key, String value) {
        invalidKeys.put(key, value);
    }


}