package com.clms.api.common.security.authorization.requiresRole;

import com.clms.api.common.security.requiresUser.RequiresUser;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
@Target({ElementType.METHOD, ElementType.TYPE}) // Can be applied to methods or classes
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresRole {
    String value(); // The role required to access the method
}
