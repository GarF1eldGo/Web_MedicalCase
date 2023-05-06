package com.lab.webserver.respository;

import com.lab.webserver.entity.RawMedicalRecord;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface RawMedicalRecordRepository extends ElasticsearchRepository<RawMedicalRecord, String>{
    List<RawMedicalRecord> findAllByTitle(String title);
    List<RawMedicalRecord> findAllByAuthor(String author);
    List<RawMedicalRecord> findAllByContentIn(String content);
    List<RawMedicalRecord> findByTags(String tags);

    List<RawMedicalRecord> findAllByTitleOrAuthorOrContentOrTags(String title, String author, String content, String tags);

    List<RawMedicalRecord> findAll();

    List<RawMedicalRecord> findAllByTitleIn(List<String> title);

}
