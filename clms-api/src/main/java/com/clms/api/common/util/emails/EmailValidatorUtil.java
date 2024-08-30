package com.clms.api.common.util.emails;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidatorUtil {

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    public static boolean validate(String email) {
        // TODO: very basic email validation, should be improved
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
        return matcher.matches();
    }
}
