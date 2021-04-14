const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = ` http://18.220.231.43:8080/users/`
const axios = require('axios')


async function makeSignUpPost(user) {
    let res = await axios.post(`${url}signup`, user);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function makeLogInPost(user) {
    let res = await axios.post(`${url}login`, user);    
    let data = res.data;
    //console.log(data)
    return data;    
}


exports.signUp = (user) =>{
   return makeSignUpPost(user)
}

exports.login = (user) =>{
    return makeLogInPost(user)
 }





