package com.lab.webserver.service;

import com.lab.webserver.entity.HistoryCount;
import com.lab.webserver.entity.User;
import com.lab.webserver.entity.UserHistory;
import com.lab.webserver.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private String getCurrentTime(){
        // 获取当前时间
        LocalDateTime now = LocalDateTime.now();
        // 格式化时间字符串
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return now.format(formatter);
    }

    @Autowired
    public UserService(UserRepository userRepository){this.userRepository = userRepository;}

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

    public List<User.Favorite> findFavoriteById(String id){
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            return user.getFavoriteHashMap();
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

