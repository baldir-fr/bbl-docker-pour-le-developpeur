package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {
"http://localhost:5173",
"http://127.0.0.1:5173",
"http://host.docker.internal:5173",
"http://kubernetes.docker.internal:5173"})
@RestController
@RequestMapping(value = "/protected")
public class ProtectedResource {

    @GetMapping("data")
    public String getData() {
        return "you got my private data!";
    }
}
