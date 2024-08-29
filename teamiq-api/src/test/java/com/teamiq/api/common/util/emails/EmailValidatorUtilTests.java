package com.teamiq.api.common.util.emails;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class EmailValidatorUtilTests {

    // Valid email tests
    @Test
    public void testValidEmail() {
        assert EmailValidatorUtil.validate("nick@gmail.com");
    }

    @Test
    public void testValidEmailWithNumbers() {
        assert EmailValidatorUtil.validate("nick12D3@gmail.com");
    }

    @Test
    public void emailShouldntContainSpecialCharacters() {
        assert !EmailValidatorUtil.validate("email@!gmail.com");
    }

    @Test
    public void emailShouldntContainSpaces() {
        assert !EmailValidatorUtil.validate("email @gmail.com");
    }
}

