package com.example.demoMyBatis.mapper;

import java.util.HashSet;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.example.demoMyBatis.model.Group;

public interface GroupUsersMapper {
    List<Group> getAllGroups();

    Group getGroupById(int id);

    void createGroup(Group group);

    void updateGroup(Group group);

    void deleteGroup(int id);

    List<Group> getAllGroupByNameContains(String name);

    void deleteUsersForGroup(@Param("groupId") int groupId);

    void insertUsersForGroup(@Param("usersId") HashSet<Integer> usersId, @Param("groupId") int groupId);
}
