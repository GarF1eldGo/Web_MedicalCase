package com.lab.webserver.controller;
import com.lab.webserver.entity.User;
import com.lab.webserver.respository.UserRepository;
import com.lab.webserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class helloController {

    private final UserService service;

    @Autowired
    public helloController(UserService service){
        this.service = service;
    }

    @ResponseBody
    @RequestMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    @PostMapping
    public void userAdd(@RequestBody final User user){
        service.save(user);
    }

    @GetMapping("/{id}")
    public User findById (@PathVariable final String id){
        return service.findById(id);
    }

    @GetMapping("/name/{username}")
    public List<User> findByName(@PathVariable final String username){
        return service.findByName(username);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable final String id){
        service.deleteById(id);
    }
}