package com.lab.webserver.service;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryFieldBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lab.webserver.entity.JsonDieaseClassification;
import com.lab.webserver.entity.MedicalRecordNode;
import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.respository.RawMedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.erhlc.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    public List<RawMedicalRecord> findByTags(String tags){
        return rawMedicalRecordRepository.findByTags(tags);
    }

    // 全局搜索
    public List<RawMedicalRecord> findBySearchAll(String content){
        return rawMedicalRecordRepository.findAllByTitleOrAuthorOrContentOrTags(content, content, content, content);
    }

    public List<MedicalRecordNode> findAllWithJSON(String type){
        List<RawMedicalRecord> allRecord = rawMedicalRecordRepository.findAll();
        List<MedicalRecordNode> data = new ArrayList<>();

        Integer threshold = 0;
        if(type.equals("disease")) {
            threshold = 5;
        }else{
            threshold = 2;
        }

        // 统计同类的数量
        Map<String, Integer> map = new HashMap<>();
        for(RawMedicalRecord record: allRecord){
            List<String> tags = record.getTags();
            for(String tag: tags){
                if (tag.contains(type)) {
                    if (map.containsKey(tag)) {
                        map.put(tag, map.get(tag) + 1);
                    } else {
                        map.put(tag, 1);
                    }
                }
            }
        }

        // 将同类数量大于阈值的加入到data中
        for(Map.Entry<String, Integer> entry: map.entrySet()){
            if(entry.getValue() >= threshold){
                MedicalRecordNode node = new MedicalRecordNode(entry.getKey(), entry.getValue());
                data.add(node);
            }
        }

        return data;
    }

    public String uploadFile(MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();
        RawMedicalRecord record = new RawMedicalRecord();

        String str = "";
        String filename = file.getOriginalFilename();
        String[] rec = filename.split("-", 2);
        String author = rec[0];
        String title = rec[1].substring(0, rec[1].lastIndexOf(".")); //忽略后缀


        String path = "D:/dck/temp/RecFile";// 文件存储路径
        try{
            File dest = new File(path + "/" + filename);
            file.transferTo(dest);
            String content = Files.readString(dest.toPath()); // 读取文件内容
            // 文件从#book到#start部分为书籍信息
            String bookInfo = content.substring(content.indexOf("#book")+5, content.indexOf("#start"));
            // 文件开头#start到#end部分为tag信息
            String tagList = content.substring(content.indexOf("#start")+6, content.indexOf("#end"));
            // 逐行读取tag信息
            String[] tags = tagList.split("\r\n");
            List<String> tag_list = List.of(tags);
            record.setTags(tag_list);
            record.setBook(bookInfo);
            record.setAuthor(author);
            record.setTitle(title);
            record.setContent(content.substring(content.indexOf("#end")+4)); // 从#end后开始为医案内容
            rawMedicalRecordRepository.save(record); // 保存到数据库
            str = mapper.writeValueAsString(record);
        } catch (Exception e){
            e.printStackTrace();
            return "error - receive file";
        }
        return str;
    }


    public List<RawMedicalRecord> findByTitleList(List<String> titleList){
        return rawMedicalRecordRepository.findAllByTitleIn(titleList);
    }

    // 获取标签列表
    public List<String> getTagList(String type){
        List<String>ret = new ArrayList<>();
        List<RawMedicalRecord> allRecord = rawMedicalRecordRepository.findAll();
        int threshold = 0;
        if (type.equals("disease")){
            threshold = 5;
        }else{
            threshold = 2;
        }

        HashMap<String, Integer> map = new HashMap<>();
        for (RawMedicalRecord record : allRecord) {
            List<String> tags = record.getTags();
            for (String tag : tags) {
                if (tag.contains(type)){
                    String[] disease = tag.split("-", 2);
                    if(disease.length != 2) continue;

                    String diseaseName = disease[1];
                    if(map.containsKey(diseaseName)){
                        map.put(diseaseName, map.get(diseaseName)+1);
                    }else{
                        map.put(diseaseName, 1);
                    }
                }
            }
        }
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            if (entry.getValue() >= threshold){
                // 判断字符数是否大于6
                if (entry.getKey().length() > 6) {
                    ret.add(entry.getKey().substring(0, 6) + "...");
                }else {
                    ret.add(entry.getKey());
                }
            }
        }
        return ret;
    }

    public List<RawMedicalRecord> getTagListRecord(String type, String tag) {
        String oneTag = type + '-' + tag;
        List<RawMedicalRecord>ret = rawMedicalRecordRepository.findByTagsIn(oneTag);
        return ret;
    }
}
