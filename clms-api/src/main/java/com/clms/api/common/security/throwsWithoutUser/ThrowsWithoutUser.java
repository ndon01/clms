package com.clms.api.common.security.throwsWithoutUser;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.TYPE}) // Can be applied to methods or classes
@Retention(RetentionPolicy.RUNTIME)
public @interface ThrowsWithoutUser {
    Class<? extends RuntimeException> exception();  // Exception to be thrown if no user is present
}