package com.lab.webserver.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "raw_medical_record", createIndex = true)
public class RawMedicalRecord {
    @Id
    @Field(type = FieldType.Text)
    private String id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String author;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Text)
    private  String tags;

    public void setId(String id) {this.id = id;}
    public String getId() {return id;}

    public void setTitle(String title) {this.title = title;}
    public String getTitle() {return title;}

    public void setAuthor(String author) {this.author = author;}
    public String getAuthor() {return author;}

    public void setContent(String content) {this.content = content;}
    public String getContent() {return content;}

    public void setTags(String tags) {this.tags = tags;}
    public String getTags() {return tags;}
}
