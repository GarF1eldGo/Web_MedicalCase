package com.lab.webserver.respository;

import com.lab.webserver.entity.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;


public interface UserRepository extends ElasticsearchRepository<User, String>{
    List<User> findAllByUsername(String username);

    User findByUsernameAndPassword(String username, String password);

}


