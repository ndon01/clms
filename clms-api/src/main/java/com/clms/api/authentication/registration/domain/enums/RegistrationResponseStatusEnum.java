package com.teamiq.api.authentication.registration.domain.enums;

public enum RegistrationResponseStatusEnum {
    SUCCESS("success"),
    INVALID("invalid"),
    CONFLICT("conflict");

    private final String status;

    RegistrationResponseStatusEnum(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

}
