package com.clms.api.common.security.requiresUser;

import com.clms.api.common.web.BaseAnnotationInterceptor;
import com.clms.api.common.security.CurrentUserContextHolder;
import com.clms.api.common.security.exceptions.UserAuthenticationRequiredException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import java.lang.reflect.Method;

@Component
public class RequiresUserInterceptor extends BaseAnnotationInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();

            // Check if @RequiresUser is present on the method or the class
            if (method.isAnnotationPresent(RequiresUser.class) || handlerMethod.getBeanType().isAnnotationPresent(RequiresUser.class)) {
                if (CurrentUserContextHolder.getCurrentUser() == null) {
                    // If no user is authenticated, return 401 Unauthorized
                    throw new UserAuthenticationRequiredException();
                }
            }
        }

        return true; // Continue with the request
    }
}
