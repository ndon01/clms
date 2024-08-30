package com.clms.api.common.util.strings;

public class StringtoCharactersOnlyCleanerUtil {
    public static String clean(String input) {
        if (input == null) {
            return "";
        }

        if (input.isBlank()) {
            return "";
        }

        return input.replaceAll("[^a-zA-Z]", "");
    }
}
