package com.teamiq.api.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping("/{path:^(?!index\\.html$|.*\\..*$).*$}")
    public String forwardSPA() {
        System.out.println("Forwarding to index.html");
        return "forward:/index.html";
    }

    @GetMapping("/")
    public String forwardRoot() {
        System.out.println("Forwarding root to index.html");
        return "forward:/index.html";
    }
}
