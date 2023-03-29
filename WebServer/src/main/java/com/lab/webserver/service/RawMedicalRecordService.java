package com.lab.webserver.service;

import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryFieldBuilders;
import com.lab.webserver.entity.RawMedicalRecord;
import com.lab.webserver.respository.RawMedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public RawMedicalRecord findByTitle(String title){
        return rawMedicalRecordRepository.findByTitle(title);
    }

    // 根据author查询医案
    public RawMedicalRecord findByAuthor(String author){
        return rawMedicalRecordRepository.findByAuthor(author);
    }

    // 根据content查询医案
    public RawMedicalRecord findByContent(String content){
        return rawMedicalRecordRepository.findByContentIn(content);
    }
}
