package com.clms.api.common.security.throwsWithoutUser;

import com.clms.api.common.web.BaseAnnotationInterceptor;
import com.clms.api.common.security.CurrentUserContextHolder;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import java.lang.reflect.Method;


@Component
public class ThrowsWithoutUserInterceptor extends BaseAnnotationInterceptor{

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Method method = handlerMethod.getMethod();

            // Check if @ThrowsWithoutUser is present on the method or the class
            ThrowsWithoutUser annotation = method.getAnnotation(ThrowsWithoutUser.class);
            if (annotation == null) {
                // Check if the annotation is present on the class level
                annotation = handlerMethod.getBeanType().getAnnotation(ThrowsWithoutUser.class);
            }

            // If the annotation is present and no user is in the context, throw the specified exception
            if (annotation != null && CurrentUserContextHolder.getCurrentUser() == null) {
                throw annotation.exception().getDeclaredConstructor().newInstance();
            }
        }

        return true; // Continue the request
    }
}