const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://pks-clientusermanagement-lb.parkinspace.143.244.176.224.nip.io/api/users`
const urlcreate = `http://pks-clientusermanagement-lb.parkinspace.143.244.176.224.nip.io/api/users/createUser`
const axios = require('axios')
var authentication = require('./authenticationServices');

async function makePostCreateUser(user) {
    
    var authUser = {
        email: user.user.email,
        password: user.user.password
    }

    
    var auth = await authentication.signUp(authUser)
    delete user.user.password;
    user.user.userId = auth.InsertedID;

    let res = await axios.post(`${urlcreate}`, user.user);
 
    let data = res.data;

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
