package com.lab.webserver.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.service.RawMedicalRecordService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@CrossOrigin
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

    @PostMapping("/upload_record")
    public void add(@RequestBody final RawMedicalRecord record){
        service.save(record);
    }

    @PostMapping("/upload")
    public String handlerFiledUpload(@RequestParam("upload_file") MultipartFile file){
        return service.uploadFile(file);
    }

    // 根据id查询医案
    @GetMapping("/{id}")
    public RawMedicalRecord findById(@PathVariable final String id){
        return service.findById(id);
    }

    @GetMapping("/title/{title}")
    public List<RawMedicalRecord> findByTitle(@PathVariable("title") String title){
        System.out.println(title);
        return service.findByTitle(title);
    }

    @GetMapping("/author/{author}")
    public List<RawMedicalRecord> findByAuthor(@PathVariable("author") final String author){
        System.out.println("author:"+author);
        return service.findByAuthor(author);
    }

    @GetMapping("/content/{content}")
    public List<RawMedicalRecord> findByContent(@PathVariable final String content){
        return service.findByContent(content);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable final String id){
        service.deleteById(id);
    }
}
