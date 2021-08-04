const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://pks-plu-lb.parkinspace.143.244.176.224.nip.io/`
const axios = require('axios')
var authentication = require('./authenticationServices');

async function makeGetParkinglotuserALL(){
    let res = await axios.get(`${url}`);
    let data = res.data
    //console.log(data)
    return data
}

async function makePostParkinglotuser(user) {

    var authUser = {
        email: user.parkinglotuser.email,
        password: user.parkinglotuser.password
    }
    
    var auth = await authentication.signUp(authUser)
    
    delete user.parkinglotuser.password;
    user.parkinglotuser.userId = auth.InsertedID;
    
    let res = await axios.post(url, user.parkinglotuser);    
    let data = res.data;
    
    return data;    
}

async function makeGetParkinglotuser(id){
    let res = await axios.get(`${url}${id.id}`);
    let data = res.data
    return data
}

async function makeDeleteParkinglotuser(id){
    let res = await axios.delete(`${url}${id.id}`);
    return res.status;
}

async function makeUpdateParkinglotuser(data){
    //console.log(JSON.stringify(data))
    //console.log(data.id)
    let res = await axios.put(`${url}${data.id}`,data.parkinglotuser)
    return res.data
}


exports.getAllParkinglotuser = () =>{
    return makeGetParkinglotuserALL()
}

exports.postParkinglotuser = (user) =>{
   return makePostParkinglotuser(user)
}

exports.getByIdParkinglotuser = (id) =>{
    return makeGetParkinglotuser(id)
}

exports.deleteParkinglotuser =(id)=>{
    return makeDeleteParkinglotuser(id)
}

exports.updateParkinglotuser = (id,data) =>{
    return makeUpdateParkinglotuser(id,data)
}



