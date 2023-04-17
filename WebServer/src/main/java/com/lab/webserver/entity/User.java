package com.lab.webserver.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(indexName = "user", createIndex = true)
public class User {

    public static class History{
        @Field(type = FieldType.Text)
        private String time;
        @Field(type = FieldType.Text)
        private String title;
        @Field(type = FieldType.Text)
        private String id; // 医案的id
        @Field(type = FieldType.Text)
        private String description;

        public History(History history){
            this.time = history.time;
            this.title = history.title;
            this.id = history.id;
            this.description = history.description;
        }

        public History(String time, String title, String id, String description){
            this.time = time;
            this.title = title;
            this.id = id;
            this.description = description;
        }

        public History(){
            this.time = "";
            this.title = "";
            this.id = "";
            this.description = "";
        }

        public String getTime() {
            return time;
        }
        public void setTime(String time) {
            this.time = time;
        }
        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }

        public String getDescription() {
            return description;
        }
        public void setDescription(String description) {
            this.description = description;
        }
    }

    public static class Favorite{
        @Field(type = FieldType.Text)
        private String time;

        @Field(type = FieldType.Text)
        private String title;

        @Field(type = FieldType.Text)
        private String id; // 医案的id

        @Field(type = FieldType.Text)
        private String description;

        public Favorite(Favorite favorite){
            this.time = favorite.time;
            this.title = favorite.title;
            this.id = favorite.id;
            this.description = favorite.description;
        }

        public Favorite(String time, String title, String id, String description){
            this.time = time;
            this.title = title;
            this.id = id;
            this.description = description;
        }

        public Favorite(){
            this.time = "";
            this.title = "";
            this.id = "";
            this.description = "";
        }

        public String getTime() {
            return time;
        }
        public void setTime(String time) {
            this.time = time;
        }
        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public String getDescription() {
            return description;
        }
        public void setDescription(String description) {
            this.description = description;
        }
    }

    @Id
    @Field(type = FieldType.Text)
    private String userID;

    @Field(type = FieldType.Text)
    private String username;
    @Field(type = FieldType.Text)
    private String password;

    @Field(type = FieldType.Nested, includeInParent = true)
    private List<History> viewHistory;

    @Field(type = FieldType.Nested, includeInParent = true)
    private  List<Favorite> favoriteHashMap;

    @Field(type = FieldType.Boolean)
    private boolean isAdmin;

    @Field(type = FieldType.Text)
    private String nickname;

    public User(String username, String password){
        this.username = username;
        this.password = password;
        this.viewHistory = new ArrayList<>();
        this.favoriteHashMap = new ArrayList<>();
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

    public void setNickname(String nickname) {this.nickname = nickname;}
    public String getNickname() {return nickname;}

    public void setViewHistory(List<History> viewHistory) {this.viewHistory = viewHistory;}
    public List<History> getViewHistory() {return viewHistory;}
    public void addViewHistory(History viewHistory) {
        if(this.viewHistory == null) {
            this.viewHistory = new ArrayList<>();
            this.viewHistory.add(viewHistory);
        }else{//插入到头部
            this.viewHistory.add(0, new History(viewHistory));
        }
    }

    public List<HistoryCount> getHistoryCount(){
        List<HistoryCount> historyCountList = new ArrayList<>();
        // 统计每天的历史记录
        Map<String, Integer> historyCountMap = new HashMap<>();
        for(History history : viewHistory){
            String time = history.getTime();
            String date = time.split(" ")[0];
            if(historyCountMap.containsKey(date)){
                historyCountMap.put(date, historyCountMap.get(date) + 1);
            }else{
                historyCountMap.put(date, 1);
            }
        }
        // 将统计结果转换为List
        for(Map.Entry<String, Integer> entry : historyCountMap.entrySet()){
            historyCountList.add(new HistoryCount(entry.getKey(), entry.getValue()));
        }
        return historyCountList;
    }

    public void setFavoriteHashMap(List<Favorite> favoriteHashMap) {this.favoriteHashMap = favoriteHashMap;}
    public List<Favorite> getFavoriteHashMap() {return favoriteHashMap;}
    public void addFavorite(UserHistory favorite) {
        Favorite tmp = new Favorite();
        tmp.setId(favorite.getRecordID());
        tmp.setTitle(favorite.getTitle());
        tmp.setDescription(favorite.getDescription());
        tmp.setTime(favorite.getTime());
        if(this.favoriteHashMap == null) {
            this.favoriteHashMap = new ArrayList<>();
            this.favoriteHashMap.add(tmp);
        }else{
            // 判断是否已经收藏
            for(Favorite favorite1 : favoriteHashMap){
                if(favorite1.getId().equals(tmp.getId())){
                    // 取消收藏
                    favoriteHashMap.remove(favorite1);
                    return;
                }
            }
            // 插入到头部
            this.favoriteHashMap.add(0, new Favorite(tmp));
        }
    }

    public void setIsAdmin(boolean isAdmin) {this.isAdmin = isAdmin;}
    public boolean getIsAdmin() {return isAdmin;}
}


