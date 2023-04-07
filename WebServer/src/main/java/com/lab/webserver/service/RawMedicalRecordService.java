package com.lab.webserver.service;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryFieldBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.respository.RawMedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.erhlc.NativeSearchQueryBuilder;
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

    // 全局搜索
    public List<RawMedicalRecord> findBySearchAll(String content){
        // 搜索作者
        List<RawMedicalRecord> authorList = rawMedicalRecordRepository.findAllByAuthor(content);
        // 搜索标题
        List<RawMedicalRecord> titleList = rawMedicalRecordRepository.findAllByTitle(content);
        // 搜索内容
        List<RawMedicalRecord> contentList = rawMedicalRecordRepository.findAllByContentIn(content);
        // 聚合结果
        List<RawMedicalRecord> result = authorList.stream().collect(Collectors.toList());
        result.addAll(titleList);
        result.addAll(contentList);
        return result;
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
            // 文件开头#start到#end部分为tag信息
            String tagList = content.substring(content.indexOf("#start")+6, content.indexOf("#end"));
            // 逐行读取tag信息
            String[] tags = tagList.split("\n");
            for(int i = 0; i< tags.length; i++){
                record.setTags(tags[i].replace("\r",""));
            }
//            record.setId(String.valueOf(rawMedicalRecordRepository.count()+1)); // 设置自增id
            record.setAuthor(author);
            record.setTitle(title);
            record.setContent(content.substring(content.indexOf("#end")+4)); // 从#end后开始为医案内容
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
