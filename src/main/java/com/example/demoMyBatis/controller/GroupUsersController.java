package com.example.demoMyBatis.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoMyBatis.model.Group;
import com.example.demoMyBatis.model.User;
import com.example.demoMyBatis.service.GroupUserService;

@RestController
@RequestMapping("/groups")
@CrossOrigin("*")
public class GroupUsersController {
    @Autowired
    private GroupUserService groupUserService;

    @GetMapping
    public List<Group> getAllGroups(){
        return groupUserService.getAllGroups();
    }

    @GetMapping("/{id}")
    public Group getGroupById(@PathVariable int id){
        return groupUserService.getGroupById(id);
    }

    @PostMapping
    public void createGroup(@RequestBody Group group){
        groupUserService.createGroup(group);
    }

    @PutMapping("/{id}")
    public void updateGroup(@PathVariable int id, @RequestBody Group group){
        group.setId(id);
        groupUserService.updateGroup(group);
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable int id){
        groupUserService.deleteGroup(id);
    }

    @GetMapping("/findByName")
    public List<Group> getAllGroupByNameContains(@RequestParam String name){
        return groupUserService.getAllGroupByNameContains(name);
    }

    @PostMapping("/updateUsersGroup/{groupId}")
    public void updateUsersForGroup(@RequestBody List<User> lstUsers, @PathVariable int groupId){
        HashSet<Integer> lstUserId = lstUsers.stream()
                                            .map(user -> user.getId())
                                            .collect(Collectors.toCollection(HashSet::new));
        groupUserService.updateUsersForGroup(lstUserId, groupId);
    }

}
