package com.clms.api.common.security.currentUser;

import com.clms.api.common.web.BaseAnnotationArgumentResolver;
import com.clms.api.users.api.User;
import com.clms.api.common.security.CurrentUserContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
@Slf4j
public class CurrentUserArgumentResolver extends BaseAnnotationArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(CurrentUser.class) != null &&
                User.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        return CurrentUserContextHolder.getCurrentUser();
    }
}
