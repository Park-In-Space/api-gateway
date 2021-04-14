const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://3.208.48.16:3001/api/users`
const urlcreate = `http://3.208.48.16:3001/api/users/createUser`
const axios = require('axios')


async function makePostCreateUser(user) {
    let res = await axios.post(`${urlcreate}`, user.user);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function makeGetUserById(id){
    let res = await axios.get(`${url}/${id.userId}`);
    let data = res.data
    return data
}

async function makeDeleteUser(id){
    let res = await axios.delete(`${url}/${id.userId}`);
    //console.log(res.data)
    return res.data;
}

async function makeUpdateUser(data){
    let id = data.user.userId;
    delete data.user.userId;
    let res = await axios.put(`${url}/${id}`,data.user)
    //console.log(res.data)
    return res.data
}

async function makeGetAllUsers(){
    let res = await axios.get(`${url}`)
    let data = res.data
    //console.log(data)
    return data
}

async function makeDeleteAllUsers(url){
    let res = await axios.delete(url)
    let data = res.data.response
    return data
}

exports.postUser = (user) =>{
   return makePostCreateUser(user)
}

exports.getById = (id) =>{
    return makeGetUserById(id)
}

exports.updateUser = (id,data) =>{
    return makeUpdateUser(id,data)
}

exports.deleteUser =(id)=>{
    return makeDeleteUser(id)
}

exports.getAllUsers = (_) => {
    let res = makeGetAllUsers()
    return res
}

exports.deleteAllUsers = (_) => {
    let res = makeDeleteAllUsers(url)
    return res;
}
