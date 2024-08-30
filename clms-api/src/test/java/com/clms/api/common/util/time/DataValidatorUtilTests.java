package com.clms.api.common.util.time;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

@SpringBootTest
public class DataValidatorUtilTests {
    @Test
    public void testIsValidDate() {
        // Arrange
        String date = "2021-01-01";

        // Act
        boolean result = DateValidatorUtil.validate(date);

        // Assert
        assert result;
    }

    @Test
    public void testWithInvalidDates() {
        // Arrange
        String[] invalidDates = new String[]{
                "2021-01-01-01",
                "2021-01-01-",
                "01-01-2021",
                "01-01-01-2021",
        };

        assert !Arrays.stream(invalidDates).anyMatch(DateValidatorUtil::validate);
    }

}
