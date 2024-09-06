package com.clms.api.common.security.jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class FilterConfig {

    private final JwtAuthenticationHttpFilter jwtAuthenticationHttpFilter;

    @Bean
    public FilterRegistrationBean<JwtAuthenticationHttpFilter> jwtFilter() {
        FilterRegistrationBean<JwtAuthenticationHttpFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(jwtAuthenticationHttpFilter);
        registrationBean.addUrlPatterns("/api/*");  // Apply to certain URL patterns
        return registrationBean;
    }
}
