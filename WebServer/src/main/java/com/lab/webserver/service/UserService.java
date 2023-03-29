package com.lab.webserver.service;

import com.lab.webserver.entity.User;
import com.lab.webserver.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

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
}

