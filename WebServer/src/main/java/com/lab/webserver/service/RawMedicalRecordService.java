package com.lab.webserver.service;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryFieldBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.respository.RawMedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RawMedicalRecordService {
    private final RawMedicalRecordRepository rawMedicalRecordRepository;

    @Autowired
    public RawMedicalRecordService(RawMedicalRecordRepository rawMedicalRecordRepository){
        this.rawMedicalRecordRepository = rawMedicalRecordRepository;
    }

    // 导入医案
    public RawMedicalRecord save(RawMedicalRecord record){
        return rawMedicalRecordRepository.save(record);
    }

    // 根据id查询医案
    public RawMedicalRecord findById(String id){
        return rawMedicalRecordRepository.findById(id).orElse(null);
    }

    // 根据id删除医案
    public void deleteById(String id){
        rawMedicalRecordRepository.deleteById(id);
    }

    // 根据title查询医案
    public List<RawMedicalRecord> findByTitle(String title){
        return rawMedicalRecordRepository.findAllByTitle(title);
    }

    // 根据author查询医案
    public List<RawMedicalRecord> findByAuthor(String author){
        return rawMedicalRecordRepository.findAllByAuthor(author);
    }

    // 根据content查询医案
    public List<RawMedicalRecord> findByContent(String content){
        return rawMedicalRecordRepository.findAllByContentIn(content);
    }

    public String uploadFile(MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();
        RawMedicalRecord record = new RawMedicalRecord();

        String str = "";
        String filename = file.getOriginalFilename();
        String[] rec = filename.split("-");
        String author = rec[0];
        String title = rec[1].substring(0, rec[1].lastIndexOf(".")); //忽略后缀


        String path = "D:/dck/temp/RecFile";// 文件存储路径
        try{
            File dest = new File(path + "/" + filename);
            file.transferTo(dest);
            String content = Files.readString(dest.toPath()); // 读取文件内容
            record.setId(String.valueOf(rawMedicalRecordRepository.count()+1)); // 设置自增id
            record.setAuthor(author);
            record.setTitle(title);
            record.setContent(content);
            rawMedicalRecordRepository.save(record); // 保存到数据库
            str = mapper.writeValueAsString(record);
        } catch (Exception e){
            e.printStackTrace();
            return "error - receive file";
        }
        System.out.println("upload success");
        return str;
    }

}
