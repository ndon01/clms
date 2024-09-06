package com.clms.api.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    /* Redirects requests to the frontend */

    @GetMapping("/{path:^(?!index\\.html$|.*\\..*$).*$}")
    public String forwardSPA() {
        return "forward:/index.html";
    }

    @GetMapping("/")
    public String forwardRoot() {
        return "forward:/index.html";
    }
}
