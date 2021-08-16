const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = ` http://10.88.14.140:8080/users/`
const axios = require('axios')
var plu = require('./plu-parkinglotuserService');
var clu = require('./userServices');
var ldapService = require('./ldapService');
const Promise = require('bluebird')

async function makeSignUpPost(user) {
    let res = await axios.post(`${url}signup`, user);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function makeLogInPost(user) {
    let res = await axios.post(`${url}login`, user);    
    let data = res.data;


    var ldap= await ldapService.authenticateDN(user.email,user.password);
    if (ldap){
        return data
    }
    else{
        console.log("Fallo LDAP")
        return false
    }

    //var authLdap= await ldapService.authenticateDN(user.email,user.password,'parkingUser');
    //console.log(authLdap)
    
    /*
    var isOwner= await makeLogInPostWA(user)
    if (isOwner.owner == true){
        console.log(user.password)
        ldapService.authenticateDN(user.email,user.password,'parkingUser')
    }
    else{
        console.log(user.password)
        ldapService.authenticateDN(user.email,user.password,'users')
    }
    */
  
}

async function makeLogInPostWA(user) {
    let res = await axios.post(`${url}login`, user);    
    let data = res.data;

    if(data === null){
        return null;
    }

    var ldap= await ldapService.authenticateDN(user.email,user.password);
    if (!ldap){
        console.log("Fallo LDAP")
        return false
    }

    let ret ={id:"",email:user.email,owner:false};
    let pluUsers = await plu.getAllParkinglotuser();
    
    for (let i = 0; i < pluUsers.length; i++){
        if(pluUsers[i].email===user.email){
            ret.id = pluUsers[i].id.toString();
            ret.owner = true;
            break;
        }
    }
    let cluUsers = await clu.getAllUsers();

    for (let i = 0; i < cluUsers.length; i++){
        if(cluUsers[i].email===user.email){
            ret.id = cluUsers[i].userId;
            break;
        }
    }

    if(ret.id===""){return null};

    return ret;    
}


exports.signUp = (user) =>{
   return makeSignUpPost(user)
}

exports.login = (user) =>{
    return makeLogInPost(user)
 }

 exports.loginWA = (user) =>{
    return makeLogInPostWA(user)
 }



