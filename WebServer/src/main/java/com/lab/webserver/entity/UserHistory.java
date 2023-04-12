package com.lab.webserver.entity;

public class UserHistory {
    private String userID;
    private String recordID;
    private String title;
    private String description;
    private String time;

    public UserHistory(String userID, String recordID, String title, String description, String time) {
        this.userID = userID;
        this.recordID = recordID;
        this.title = title;
        this.description = description;
        this.time = time;
    }

    public String getUserID() {
        return userID;
    }
    public void setUserID(String userID) {
        this.userID = userID;
    }
    public String getRecordID() {
        return recordID;
    }
    public void setRecordID(String recordID) {
        this.recordID = recordID;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
}
