package com.lab.webserver.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "user", createIndex = true)
public class User {
    // 自增主键
    @Id
    @Field(type = FieldType.Text)
    private String userID;

    @Field(type = FieldType.Text)
    private String username;
    @Field(type = FieldType.Text)
    private String password;

    public User(String username, String password){
        this.username = username;
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getUsername() {return username;}

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }

    public void setUserID(String userID) {this.userID = userID;}
    public String getUserID() {return userID;}
}


