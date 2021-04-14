const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://18.206.127.10:8080/`
const axios = require('axios')

async function makeCreateNewParking(parking) {
    let res = await axios.post(`${url}parking`, parking.parking);    
    let data = res.data;
    return data;    
}

async function makeGetParkingById(id){
    let res = await axios.get(`${url}parking/${id.id}`);
    let data = res.data
    console.log(data)
    return data
}

async function makeGetParkings(){
    let res = await axios.get(`${url}parkings`);
    let data = res.data
    return data
}

async function makeDeleteParking(id){
    let res = await axios.delete(`${url}parking/${id.id}`);
    return res.status;
}

async function makeUpdateParking(id,parking){
    let data = parking.parking
    delete data.id;
    let res = await axios.put(`${url}parking/${id.id}`,data)
    return res.data.message
}

exports.createNewParking = (parking) =>{
   return makeCreateNewParking(parking)
}

exports.getParkingById = (id) =>{
    return makeGetParkingById(id)
}

exports.getParkings = () =>{
    return makeGetParkings()
}

exports.deleteParking =(id)=>{
    return makeDeleteParking(id)
}

exports.updateParking =(id,parking)=>{
    return makeUpdateParking(id,parking)
}

