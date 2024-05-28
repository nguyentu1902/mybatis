package com.example.demoMyBatis.mapper;

import java.util.List;

import com.example.demoMyBatis.model.User;

public interface UserMapper {
    List<User> getAllUsers();

    User getUserById(int id);

    void insertUser(User user);

    void updateUser(User user);

    void deleteUser(int id);

    List<User> getAllUserByNameContains(String name);
}
