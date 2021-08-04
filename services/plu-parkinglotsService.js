const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://pks-plu-lb.parkinspace.143.244.176.224.nip.io/`
const axios = require('axios')

async function makeGetParkinglotALL(){
    let res = await axios.get(`${url}`);
    let data = res.data
    //console.log(data)
    return data
}

async function makePostParkinglot(user) {
    //console.log(JSON.stringify(user))
    let res = await axios.post(url, user.Parkinglot);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function makeGetParkinglot(id){
    let res = await axios.get(`${url}${id.id}`);
    let data = res.data
    return data
}

async function makeDeleteParkinglot(id){
    let res = await axios.delete(`${url}${id.id}`);
    return res.status;
}

async function makeUpdateParkinglot(data){
    //console.log(JSON.stringify(data))
    let res = await axios.put(`${url}${data.id}`,data.Parkinglot)
    return res.data
}


exports.getAllParkinglot = () =>{
    return makeGetParkinglotALL()
}

exports.postParkinglot = (user) =>{
   return makePostParkinglot(user)
}

exports.getByIdParkinglot = (id) =>{
    return makeGetParkinglot(id)
}

exports.deleteParkinglot =(id)=>{
    return makeDeleteParkinglot(id)
}

exports.updateParkinglot = (id,data) =>{
    return makeUpdateParkinglot(id,data)
}
