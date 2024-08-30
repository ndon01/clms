package com.clms.api.common.util.passwords;

public class PasswordValidatorUtil {
    public static String AllowedSpecialCharacters = "!@#$%^&*";
    public static boolean validate(String password) {
        /*
            * password cannot be null
            * password cannot be empty or blank
            * password must be between 10 and 64 characters
            * password must contain at least one uppercase letter
            * password must contain at least one lowercase letter
            * password must contain at least one digit
            * password must contain at least one special character (!@#$%^&*()-_+=)
            * password cannot contain spaces
         */

        // password cannot be null
        if (password == null) {
            System.out.println("Password cannot be null");
            return false;
        }

        // password cannot be empty or blank
        if (password.isBlank()) {
            System.out.println("Password cannot be empty or blank");
            return false;
        }

        // password must be between 10 and 64 characters
        if (password.length() < 10 || password.length() > 64) {
            System.out.println("Password length must be between 10 and 64 characters");
            return false;
        }

        /*
         * password must contain at least one uppercase letter
         * password must contain at least one lowercase letter
         * password must contain at least one digit
         * password must contain at least one special character (!@#$%^&*()-_+=)
         */
        boolean hasUppercase = false;
        boolean hasLowercase = false;
        boolean hasDigit = false;
        boolean hasSpecial = false;

        for (char c : password.toCharArray()) {
            if (Character.isUpperCase(c)) {
                hasUppercase = true;
                continue;
            } else if (Character.isLowerCase(c)) {
                hasLowercase = true;
                continue;
            } else if (Character.isDigit(c)) {
                hasDigit = true;
                continue;
            } else if (AllowedSpecialCharacters.indexOf(c) != -1) {
                hasSpecial = true;
                continue;
            }

            // password cannot contain spaces or other illegal characters
            System.out.println("Password contains illegal character, breaking early.");
            return false;
        }

        return hasUppercase && hasLowercase && hasDigit && hasSpecial;
    }
}
