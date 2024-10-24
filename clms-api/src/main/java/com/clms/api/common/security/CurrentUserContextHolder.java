package com.clms.api.common.security;

import com.clms.api.users.api.User;

public class CurrentUserContextHolder {
    public static ThreadLocal<User> currentUser = new ThreadLocal<>();

    public static User getCurrentUser() {
        return currentUser.get();
    }

    public static void setCurrentUser(User user) {
        currentUser.set(user);
    }
}
