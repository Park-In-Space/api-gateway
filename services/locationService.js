const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://pks-location-lb.parkinspace.143.244.176.224.nip.io/locations`
const axios = require('axios')

async function makePostLocation(location) {
  //console.log(location)
  let res = await axios.post(`${url}.json`, location);  
  let data = res.data;
  //console.log(data)
  return data;    
}

async function makeGetLocation(id){
  let res = await axios.get(`${url}/${id.id}.json`);
  let data = res.data
  return data
}

async function makeDeleteLocation(id){
  let res = await axios.delete(`${url}/${id.id}`);
  return res.status;
}

async function makeUpdateLocation(data){
  let StoredID = data.id
  delete data.id
  //console.log(StoredID)
  //console.log(data)
  let res = await axios.put(`${url}/${StoredID}.json`,data)
  return res.data
}

exports.postLocation = (location) =>{
 return makePostLocation(location)
}

exports.getById = (id) =>{
  return makeGetLocation(id)
}

exports.updateLocation = (data) =>{
  return makeUpdateLocation(data)
}

exports.deleteLocation =(id)=>{
  return makeDeleteLocation(id)
}