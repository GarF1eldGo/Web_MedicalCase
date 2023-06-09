package com.lab.webserver.service;

import co.elastic.clients.elasticsearch._types.Script;
import com.lab.webserver.entity.*;
import com.lab.webserver.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ScriptService scriptService;

    private HashMap<String, List<String>> recommendationMap;
    private HashMap<String, List<String>> recommendationMapMZY;
    private HashMap<String, List<String>> recommendationMapMHP;

    private String getCurrentTime(){
        // 获取当前时间
        LocalDateTime now = LocalDateTime.now();
        // 格式化时间字符串
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return now.format(formatter);
    }

    @Autowired
    public UserService(UserRepository userRepository, ScriptService scriptService){
        this.userRepository = userRepository;
        this.scriptService = scriptService;
        this.recommendationMap = readCSVFile("src/main/resources/static/ConsineHashMap.csv");
        this.recommendationMapMZY = readCSVFile("src/main/resources/static/ConsineHashMapMZY.csv");
        this.recommendationMapMHP = readCSVFile("src/main/resources/static/ConsineHashMapMHP.csv");
    }

    public long count(){
        return userRepository.count();
    }

    public User save(User user){return userRepository.save(user);}

    public void delete(User user){
        userRepository.delete(user);
    }

    public void deleteById(String id) {userRepository.deleteById(id);}

    public User findById(String id) {return userRepository.findById(id).orElse(null);}

    public List<User> findByName(String username){
        return userRepository.findAllByUsername(username);
    }

    public User login(User user){
        User ret =  userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        return ret;
    }

    public void logout(){
        // 用户登出就停止推荐算法脚本
//        scriptService.stopScript();
    }

    public User signup(User user){
        // 判断用户名是否已经存在
        List<User> ret = userRepository.findAllByUsername(user.getUsername());
        if(ret.size() > 0){
            return null;
        }
        // 不存在则创建新用户
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());
        user.setIsAdmin(false);
        user.setNickname("新用户");
        userRepository.save(user);
        return user;
    }

    public void updateHistory(UserHistory history){
        User user = userRepository.findById(history.getUserID()).orElse(null);
        if(user != null){
            // 判断当天是否有相同的记录
            Integer index = -1;
            String curDay = parseTime(history.getTime());
            List<User.History> historyList = user.getViewHistory();
            for(int i = 0; historyList != null && i < historyList.size(); i++){
                User.History h = historyList.get(i);
                if (parseTime(h.getTime()).equals(curDay) && h.getId().equals(history.getRecordID())){
                    index = user.getViewHistory().indexOf(h);
                    break;
                }
            }

            if(index != -1){
                user.getViewHistory().remove(index.intValue());
            }
            User.History h = new User.History();
            h.setId(history.getRecordID());
            h.setTime(history.getTime());
            h.setTitle(history.getTitle());
            h.setDescription(history.getDescription());
            user.addViewHistory(h);
//             只保留前50条记录
//            while(user.getViewHistory().size() > 50){
//                user.getViewHistory().remove(50);
//            }
            userRepository.save(user);
            System.out.println(getCurrentTime()+" " + user.getUserID() + " " + history.getRecordID() + " " + history.getTime());
        }
    }

    public List<User.History> findHistoryById(String id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            return user.getViewHistory();
        }
        return null;
    }

    public List<HistoryCount> findHistoryCountById(String id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            return user.getHistoryCount();
        }
        return null;
    }

    public void updateFavorite(UserHistory favorite){
        User user = userRepository.findById(favorite.getUserID()).orElse(null);
        if(user != null) {
            user.addFavorite(favorite);
            userRepository.save(user);
        }
    }

    /**
     * 根据用户ID和医案ID判断是否已经收藏
     * @param id
     * @param recordID
     * @return boolean
     */
    public boolean findFavoriteByIdAndRecord(String id, String recordID){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            List<User.Favorite> favorites = user.getFavoriteHashMap();
            for(User.Favorite favorite : favorites){
                if(favorite.getId().equals(recordID)){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 通过用户ID获取用户收藏夹
     * @param id
     * @return 用户收藏夹List
     */
    public List<User.Favorite> findFavoriteById(String id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            return user.getFavoriteHashMap();
        }
        return null;
    }


    /**
     * 通过推荐算法获取推荐结果
     * @param record
     * @return 医案名称
     */
    public List<String> findRecommendation(RawMedicalRecord record){
        String book = record.getBook().strip();
        String title = record.getTitle();
        if (book.equals("中国现代名中医医案精华")){
            title = record.getAuthor() + "-" + title;
            List<String>titleList = new ArrayList<>(recommendationMapMZY.get(title));
            for (int i = 0; i < titleList.size(); i++){
                titleList.set(i, titleList.get(i).split("-")[1]);
            }
            return titleList;
        }else if (book.equals("茅汉平-名老中医临证验案集")) {
            return recommendationMapMHP.get(title);
        }else if (book.equals("熊继柏临证医案实录1")) {
            return recommendationMap.get(title);
        }else{
            return null;
        }
    }

    public List<ViewHistoryCount> findViewHistoryCountById(String id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            List<User.History>userHistory = user.getViewHistory();
            HashMap<String, Integer> map = new HashMap<>();
            for(User.History history : userHistory){
                String title = history.getTitle();
                if(map.containsKey(title)){
                    map.put(title, map.get(title)+1);
                }else{
                    map.put(title, 1);
                }
            }
            List<ViewHistoryCount> ret = new ArrayList<>();
            for(String key : map.keySet()){
                ViewHistoryCount viewHistoryCount = new ViewHistoryCount(key, map.get(key));
                ret.add(viewHistoryCount);
            }
            // 按次数排序
            Collections.sort(ret, new Comparator<ViewHistoryCount>() {
                @Override
                public int compare(ViewHistoryCount o1, ViewHistoryCount o2) {
                    return o2.getCount() - o1.getCount();
                }
            });
            // 返回前10个记录
            return ret.subList(0, Math.min(10, ret.size()));
        }
        return null;
    }

    private HashMap<String, List<String>> readCSVFile(String csvFilePath){
        FileReader fileReader = null;
        try {
            fileReader = new FileReader(csvFilePath);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        String line = "";
        List<List<String>> eachLine = new ArrayList<>();
        try {
            while ((line = bufferedReader.readLine()) != null) {
                String[] item = line.split(",");
                eachLine.add(Arrays.asList(item));
            }
            HashMap<String, List<String>> map = new HashMap<>();
            for(int i = 0; i < eachLine.get(0).size(); i++){
                String key = eachLine.get(0).get(i);
                List<String> values = new ArrayList<>();
                for (int j = 1; j < eachLine.size(); j++) {
                    values.add(eachLine.get(j).get(i));
                }
                map.put(key, values);
            }
            return map;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private String parseTime(String time){
        String ret = "";
        String[] tmp = time.split(" ");
        ret = tmp[0];
        return ret;
    }
}

