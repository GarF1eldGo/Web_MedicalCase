package com.lab.webserver.controller;
import com.lab.webserver.entity.HistoryCount;
import com.lab.webserver.entity.User;
import com.lab.webserver.entity.UserHistory;
import com.lab.webserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class userController {

    private final UserService service;

    @Autowired
    public userController(UserService service){
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
    @ResponseBody
    @PostMapping("/login")
    public User login(@RequestBody final User user){
        return service.login(user);
    }

    @ResponseBody
    @PostMapping("/updateHistory")
    public void updateHistory(@RequestBody final UserHistory history){
        service.updateHistory(history);
    }

    @GetMapping("/viewHistory/{id}")
    public List<User.History> findHistoryById(@PathVariable final String id){
        return service.findHistoryById(id);
    }

    @GetMapping("/historyCount/{id}")
    public List<HistoryCount> findHistoryCountById(@PathVariable final String id){
        return service.findHistoryCountById(id);
    }
}