package com.clms.api.common.util.time;

public class DateValidatorUtil {
    // We expect the date to be in the format of "YYYY-MM-DD"
    public static boolean validate(String date) {
        if (date == null) {
            return false;
        }

        if (date.isBlank()) {
            return false;
        }

        if (date.length() != 10) {
            return false;
        }

        String[] dateParts = date.split("-");
        if (dateParts.length != 3) {
            return false;
        }

        if (dateParts[0].length() != 4) {
            return false;
        }

        if (dateParts[1].length() != 2) {
            return false;
        }

        return dateParts[2].length() == 2;
    }
}
