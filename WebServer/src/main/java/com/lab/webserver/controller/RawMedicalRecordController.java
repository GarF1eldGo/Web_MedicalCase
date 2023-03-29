package com.lab.webserver.controller;


import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.service.RawMedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rawMedicalRecord")
public class RawMedicalRecordController {
    private final RawMedicalRecordService service;

    @Autowired
    public RawMedicalRecordController(RawMedicalRecordService service){
        this.service = service;
    }

    @ResponseBody
    @RequestMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    @PostMapping
    public void add(@RequestBody final RawMedicalRecord record){
        System.out.println("in");
        System.out.println(record.getAuthor());
        service.save(record);
    }

    // 根据id查询医案
    @GetMapping("/{id}")
    public RawMedicalRecord findById(@PathVariable final String id){
        return service.findById(id);
    }

    @GetMapping("/title/{title}")
    public RawMedicalRecord findByTitle(@PathVariable final String title){
        return service.findByTitle(title);
    }

    @GetMapping("/author/{author}")
    public RawMedicalRecord findByAuthor(@PathVariable final String author){
        return service.findByAuthor(author);
    }

    @GetMapping("/content/{content}")
    public RawMedicalRecord findByContent(@PathVariable final String content){
        return service.findByContent(content);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable final String id){
        service.deleteById(id);
    }
}
