package com.lab.webserver.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.lab.webserver.entity.JsonDieaseClassification;
import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.service.RawMedicalRecordService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.security.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/rawMedicalRecord")
public class RawMedicalRecordController {
    private final RawMedicalRecordService service;

    private String getCurrentTime(){
        // 获取当前时间
        LocalDateTime now = LocalDateTime.now();
        // 格式化时间字符串
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return now.format(formatter);
    }

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
        System.out.println(getCurrentTime() +  " file:" + file.getOriginalFilename());
        return service.uploadFile(file);
    }

    // 根据id查询医案
    @GetMapping("/record/{id}")
    public RawMedicalRecord findById(@PathVariable final String id){
        return service.findById(id);
    }

    @GetMapping("/title/{title}")
    public List<RawMedicalRecord> findByTitle(@PathVariable("title") String title){
        System.out.println(getCurrentTime() + "title:" + title);
        return service.findByTitle(title);
    }

    @GetMapping("/author/{author}")
    public List<RawMedicalRecord> findByAuthor(@PathVariable("author") String author){
        System.out.println(getCurrentTime() + " author:" + author);
        return service.findByAuthor(author);
    }

    @GetMapping("/content/{content}")
    public List<RawMedicalRecord> findByContent(@PathVariable final String content){
        System.out.println(getCurrentTime() + " content:" + content);
        return service.findByContent(content);
    }

    @GetMapping("/tag/{tag}")
    public List<RawMedicalRecord> findByTag(@PathVariable("tag") String tag){
        System.out.println(getCurrentTime() + " tag:" + tag);
        return service.findByTags(tag);
    }

    @GetMapping("/searchAll/{searchAll}")
    public List<RawMedicalRecord> findBySearchAll(@PathVariable("searchAll") String searchAll){
        System.out.println(getCurrentTime() + "searchAll:" + searchAll);
        return service.findBySearchAll(searchAll);
    }

    @GetMapping("/classification/disease")
    public JsonDieaseClassification getDiseaseClassification(){
        System.out.println(getCurrentTime() + " getDiseaseClassification");
        return service.findAllWithJSON();
    }


    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable final String id){
        service.deleteById(id);
    }
}
