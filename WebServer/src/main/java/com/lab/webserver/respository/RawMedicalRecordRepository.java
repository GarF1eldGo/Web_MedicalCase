package com.lab.webserver.respository;

import com.lab.webserver.entity.RawMedicalRecord;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface RawMedicalRecordRepository extends ElasticsearchRepository<RawMedicalRecord, String>{
    <List>RawMedicalRecord findByTitle(String title);
    <List>RawMedicalRecord findByAuthor(String author);
    <List>RawMedicalRecord findByContentIn(String content);
}
