package com.lab.webserver.controller;
import com.lab.webserver.entity.*;
import com.lab.webserver.service.RawMedicalRecordService;
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
    private final RawMedicalRecordService recordService;

    @Autowired
    public userController(UserService service, RawMedicalRecordService recordService){
        this.service = service;
        this.recordService = recordService;
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

    @PostMapping("/logout")
    public void logout(@RequestBody final User user){
        service.logout();
    }

    @PostMapping("/signup")
    public User signup(@RequestBody final User user){ return service.signup(user); }

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

    @PostMapping("/updateFavorite")
    public void updateFavorite(@RequestBody final UserHistory favorite){
        service.updateFavorite(favorite);
    }

    @GetMapping("/favorite/{id}/{recordID}")
    public boolean findFavoriteById(@PathVariable final String id, @PathVariable final String recordID){
        return service.findFavoriteByIdAndRecord(id, recordID);
    }

    @GetMapping("/getFavorite/{id}")
    public List<User.Favorite> findFavoriteById(@PathVariable final String id){
        return service.findFavoriteById(id);
    }

    @GetMapping("/recommendation/{recordID}")
    public List<RawMedicalRecord> findRecommendation(@PathVariable final String recordID){
        RawMedicalRecord record = recordService.findById(recordID);
        String book = record.getBook();
        List<String>filenameList = service.findRecommendation(record);
        return recordService.findByTitleList(filenameList, book);
    }

    @GetMapping("/viewHistoryCount/{id}")
    public List<ViewHistoryCount> findViewHistoryCountById(@PathVariable final String id){
        return service.findViewHistoryCountById(id);
    }
}