package com.example.demoMyBatis.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demoMyBatis.mapper.UserMapper;
import com.example.demoMyBatis.model.User;

@Service
public class UserService{

    @Autowired
    private UserMapper userMapper;

    public List<User> getAllUsers(){
        return userMapper.getAllUsers();
    }

    public User getUserById(int id){
        return userMapper.getUserById(id);
    }

    public void createUser(User user){
        userMapper.insertUser(user);
    }

    public void updateUser(User user){
        userMapper.updateUser(user);
    }

    public void deleteUser(int id){
        userMapper.deleteUser(id);
    }

    public List<User> getAllUserByNameContains(String name){
        return userMapper.getAllUserByNameContains(name);
    }

}
