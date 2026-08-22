package com.example.cloudbackend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    
    // Forward all non-api routes to index.html so React Router can handle them
    @RequestMapping(value = {
        "/", 
        "/{x:[\\w\\-]+}", 
        "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
