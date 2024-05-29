import axios from "axios";

const API_URL = 'http://localhost:8080/groups';

class GroupService{

    getAllGroups(){
        return axios.get(API_URL);
    }

    getGroupById(id){
        return axios.get(`${API_URL}/${id}`);
    }

    createGroup(Groups){
        return axios.post(API_URL, Groups);
    }

    updateGroup(id, Group){
        return axios.put(`${API_URL}/${id}`, Group);
    }

    deleteGroup(id){
        return axios.delete(`${API_URL}/${id}`);
    }

    getAllGroupByNameContains(name){
        return axios.get(`${API_URL}/findByName`, { params: {name} });
    }
}

export default new GroupService();