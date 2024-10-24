package com.clms.api.common.security.authorization.requiresRole;

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
import java.util.Set;

@Component
public class RequiresRoleInterceptor extends BaseAnnotationInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod handlerMethod) {
            Method method = handlerMethod.getMethod();

            // Check if @RequiresRole is present on the method or the class
            if (method.isAnnotationPresent(RequiresRole.class) || handlerMethod.getBeanType().isAnnotationPresent(RequiresRole.class)) {
                User user = CurrentUserContextHolder.getCurrentUser();
                if (user == null) {
                    throw new UserAuthenticationRequiredException();
                }

                // Check if the user has the required role
                RequiresRole requiresRole = method.getAnnotation(RequiresRole.class);
                String role = requiresRole != null ? requiresRole.value() : handlerMethod.getBeanType().getAnnotation(RequiresRole.class).value(); // idk chatgpt

                Set<Role> roles = user.getRoles();
                if (roles == null) {
                    throw new UserAuthenticationRequiredException();
                }

                if (roles.isEmpty()) {
                    throw new UserAuthenticationRequiredException();
                }
                // If the user does not have the required role, return 403 Forbidden
                return roles.stream().anyMatch(r -> r.getName().equals(role));
            }
        }

        return true; // Continue with the request
    }
}
