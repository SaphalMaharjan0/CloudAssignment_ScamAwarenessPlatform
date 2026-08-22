package com.example.cloudbackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    
    // Forward all non-api routes to index.html so React Router can handle them
    @RequestMapping(value = {
        "/",
        "/login", "/signup", "/forgot-password", "/reset-password",
        "/app/**", "/admin/**", "/database/**", "/articles/**", "/report/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
