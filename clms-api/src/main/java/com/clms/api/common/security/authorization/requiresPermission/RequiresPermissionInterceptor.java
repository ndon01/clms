package com.clms.api.common.security.authorization.requiresPermission;

import com.clms.api.authorization.Permission;
import com.clms.api.authorization.Role;
import com.clms.api.users.api.User;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.common.security.exceptions.UserAuthenticationRequiredException;
import com.clms.api.common.web.BaseAnnotationInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;

@Component
public class RequiresPermissionInterceptor extends BaseAnnotationInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod handlerMethod) {
            Method method = handlerMethod.getMethod();

            // Check if @RequiresRole is present on the method or the class
            if (method.isAnnotationPresent(RequiresPermission.class) || handlerMethod.getBeanType().isAnnotationPresent(RequiresPermission.class)) {

                RequiresPermission requiresPermission = method.getAnnotation(RequiresPermission.class);
                String permission = requiresPermission != null ? requiresPermission.value() : handlerMethod.getBeanType().getAnnotation(RequiresPermission.class).value(); // idk chatgpt

                Set<Permission> permissions = getPermissions();

                return permissions.stream().anyMatch(p -> p.getName().equals(permission));
            }
        }

        return true; // Continue with the request if no permission is required
    }

    private static Set<Permission> getPermissions() {
        User user = CurrentUserContextHolder.getCurrentUser();
        if (user == null) {
            throw new UserAuthenticationRequiredException();
        }

        Set<Permission> permissions = new HashSet<>();
        for (Role role : user.getRoles()) {
            permissions.addAll(role.getPermissions());
        }

        permissions.addAll(user.getPermissions());
        return permissions;
    }
}
