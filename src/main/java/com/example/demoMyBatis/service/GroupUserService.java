package com.example.demoMyBatis.service;

import java.util.HashSet;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demoMyBatis.mapper.GroupUsersMapper;
import com.example.demoMyBatis.model.Group;

@Service
public class GroupUserService {
    @Autowired
    private GroupUsersMapper groupUsersMapper;

    public List<Group> getAllGroups() {
        return groupUsersMapper.getAllGroups();
    }

    public List<Group> getAllGroupByNameContains(String name) {
        return groupUsersMapper.getAllGroupByNameContains(name);
    }

    public Group getGroupById(int id) {
        return groupUsersMapper.getGroupById(id);
    }

    public void createGroup(Group group) {
        groupUsersMapper.createGroup(group);
    }

    public void updateGroup(Group group) {
        groupUsersMapper.updateGroup(group);
    }

    public void deleteGroup(int id) {
        groupUsersMapper.deleteGroup(id);
    }

    @Transactional
    public void updateUsersForGroup(HashSet<Integer> usersId, int groupId){
        groupUsersMapper.deleteUsersForGroup(groupId);
        if(usersId != null && !usersId.isEmpty())
            groupUsersMapper.insertUsersForGroup(usersId, groupId);
    }
}
