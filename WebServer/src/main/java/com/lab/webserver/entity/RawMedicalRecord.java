package com.lab.webserver.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@Document(indexName = "medical_record", createIndex = true)
public class RawMedicalRecord {
    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Keyword)
    private String author;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Text)
    private List<String> tags;

    @Field(type = FieldType.Keyword)
    private String book;

    @Field(type = FieldType.Boolean)
    private Boolean real;

    public void setId(String id) {this.id = id;}
    public String getId() {return id;}

    public void setTitle(String title) {this.title = title;}
    public String getTitle() {return title;}

    public void setAuthor(String author) {this.author = author;}
    public String getAuthor() {return author;}

    public void setContent(String content) {this.content = content;}
    public String getContent() {return content;}

    public void setTags(List<String> tags) {this.tags = tags;}
    public List<String> getTags() {return tags;}

    public void setBook(String book) {this.book = book;}
    public String getBook() {return book;}

    public void setReal(Boolean real) {this.real = real;}
    public Boolean getReal() {return real;}
}
