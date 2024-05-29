import axios from "axios";

const API_URL = 'http://localhost:8080/users';

class UserService{

    getAllUsers(){
        return axios.get(API_URL);
    }

    getUserById(id){
        return axios.get(`${API_URL}/${id}`);
    }

    createUser(users){
        return axios.post(API_URL, users);
    }

    updateUser(id, user){
        return axios.put(`${API_URL}/${id}`, user);
    }

    deleteUser(id){
        return axios.delete(`${API_URL}/${id}`);
    }

    getAllUserByNameContains(name){
        return axios.get(`${API_URL}/findByName`, { params: {name} });
    }
}

export default new UserService();