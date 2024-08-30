package com.teamiq.api.common.util.passwords;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PasswordValidatorUtilTests {

    private static final String VALID_SHORT_PASSWORD = "Abcd1234!#";
    private static final String VALID_LONG_PASSWORD = "Abcd1234!#" + "A".repeat(54);
    @Test
    void NullPasswordTest() {
        // null passwords aren't allowed
        assert !PasswordValidatorUtil.validate(null);
    }

    @Test
    void EmptyPasswordTest() {
        // empty passwords aren't allowed
        assert !PasswordValidatorUtil.validate("");
    }

    @Test
    void BlankPasswordTest() {
        // blank passwords aren't allowed
        assert !PasswordValidatorUtil.validate(" ".repeat(15));
    }

    @Test
    void LessThan10Characters() {
        // passwords shorter than 10 characters aren't allowed
        assert !PasswordValidatorUtil.validate("Abc123!");
    }

    @Test
    void LongerThan64Characters() {
        // passwords longer than 64 characters aren't allowed
        assert !PasswordValidatorUtil.validate(VALID_SHORT_PASSWORD + "A".repeat(64));
    }

    @Test
    void NoUppercase() {
        // passwords without uppercase letters aren't allowed
        assert !PasswordValidatorUtil.validate("abc123!@392");
    }

    @Test
    void NoLowercase() {
        // passwords without lowercase letters aren't allowed
        assert !PasswordValidatorUtil.validate("ABC123!@392");
    }

    @Test
    void NoDigit() {
        // passwords without digits aren't allowed
        assert !PasswordValidatorUtil.validate("Abcdefg!@#");
    }

    @Test
    void NoSpecialCharacter() {
        // passwords without special characters aren't allowed
        assert !PasswordValidatorUtil.validate("ABcd12345");
    }

    @Test
    void OnlyValidSpecialCharacters() {
        // passwords with only valid special characters are allowed: !@#$%^&*()-_+=
        assert PasswordValidatorUtil.validate("Abcde12345!@#$%^&*");
    }

    @Test
    void InvalidSpecialCharacter() {
        // passwords with invalid special characters aren't allowed
        assert !PasswordValidatorUtil.validate("Abcde12345]][");
    }

    @Test
    void NoSpaces() {
        // passwords with spaces aren't allowed
        assert !PasswordValidatorUtil.validate("Abcde 12 345!#");
    }

    @Test
    void ValidShortPasswordWorks() {
        // valid short password
        assert PasswordValidatorUtil.validate(VALID_SHORT_PASSWORD);
    }

    @Test
    void ValidLongPasswordWorks() {
        // valid long password
        assert PasswordValidatorUtil.validate(VALID_LONG_PASSWORD);
    }


}
