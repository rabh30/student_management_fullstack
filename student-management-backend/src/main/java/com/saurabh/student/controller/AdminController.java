package com.saurabh.student.controller;

import com.saurabh.student.model.Admin;
import com.saurabh.student.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        return adminRepository.findByUsername(admin.getUsername())
                .filter(a -> a.getPassword().equals(admin.getPassword()))
                .map(a -> ResponseEntity.ok("Login Successful"))
                .orElse(ResponseEntity.status(401).body("Invalid username or password"));
    }
}
