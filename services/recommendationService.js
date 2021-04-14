const axios = require('axios')
const http  = require('http');
const { resolve } = require('path');
//base url for the service
const recommendation_url = `http://3.89.56.78:8000/recommendation/`

//Post a User
async function saveUser(user) {
    let response = await axios.post(`${recommendation_url}users/`, user);
    let data = response.data;
    return data;    
}
// Get a User
async function getUser(id) {
    let response = await axios.get(`${recommendation_url}users/${id.id}`);
    let data = response.data;
    return data;    
}
// Get All Users
async function getUsers() {
    let response = await axios.get(`${recommendation_url}users/`);
    let data = response.data;
    return data;    
}

// Update a User
async function updateUser(data) { 
    let id = data.oldid;
    delete data.oldid;
    let response = await axios.put(`${recommendation_url}users/${id}`, data);
    let a = response.data;
    return a;    
}

// Delete a User
async function deleteUser(id) {
    let response = await axios.delete(`${recommendation_url}users/${id.id}`);
    return response.status;    
}

//Post a Parking lot
async function saveParkinglot(parking) {
    let response = await axios.post(`${recommendation_url}parking_lots/`, parking);
    let data = response.data;
    return data;    
}
// Get a Parking lot
async function getParkinglot(id) {
    let response = await axios.get(`${recommendation_url}parking_lots/${id.id}`);
    let data = response.data;
    return data;    
}
// Get All Parking lots
async function getParkinglots() {
    let response = await axios.get(`${recommendation_url}parking_lots/`);
    let data = response.data;
    return data;    
}

// Update a Parking lot
async function updateParkinglot(data) { 
    let id = data.oldid;
    delete data.oldid;
    let response = await axios.put(`${recommendation_url}parking_lots/${id}`, data);
    let a = response.data;
    return a;    
}

// Delete a Parking lot
async function deleteParkinglot(id) {
    
    let response = await axios.delete(`${recommendation_url}parking_lots/${id.id}`);
    return response.status;    
}
//Post a Near Parking lot
async function saveNearParkinglot(parking) {
    let response = await axios.post(`${recommendation_url}near-parking-lots/`, parking);
    let data = response.data;
    return data;    
}
// Get a Near Parking lot
async function getNearParkinglot(id) {
    let response = await axios.get(`${recommendation_url}near-parking-lots/${id.id}`);
    let data = response.data;
    return data;    
}
// Get All Near Parking lots
async function getNearParkinglots() {
    let response = await axios.get(`${recommendation_url}near-parking-lots/`);
    let data = response.data;
    return data;    
}

// Update a Near Parking lot
async function updateNearParkinglot(data) { 
    let id = data.oldid;
    delete data.oldid;
    let response = await axios.put(`${recommendation_url}near-parking-lots/${id}`, data);
    let a = response.data;
    return a;    
}

// Delete a Near Parking lot
async function deleteNearParkinglot(id) {
    
    let response = await axios.delete(`${recommendation_url}near-parking-lots/${id.id}`);
    return response.status;    
}


//exports save
exports.saveUser = (user) =>{
    return saveUser(user)
}
exports.getUser = (id) =>{
    return getUser(id)
}
exports.getUsers = () =>{
    return getUsers()
}
exports.updateUser = (id,user) =>{
    return updateUser(id,user)
}
exports.deleteUser = (id) =>{
    return deleteUser(id)
}
//exports parking-lots
exports.saveParkinglot = (user) =>{
    return saveParkinglot(user)
}
exports.getParkinglot = (id) =>{
    return getParkinglot(id)
}
exports.getParkinglots = () =>{
    return getParkinglots()
}
exports.updateParkinglot = (id,user) =>{
    return updateParkinglot(id,user)
}
exports.deleteParkinglot = (id) =>{
    return deleteParkinglot(id)
}
//exports near parking lots
exports.saveNearParkinglot = (user) =>{
    return saveNearParkinglot(user)
}
exports.getNearParkinglot = (id) =>{
    return getNearParkinglot(id)
}
exports.getNearParkinglots = () =>{
    return getNearParkinglots()
}
exports.updateNearParkinglot = (id,user) =>{
    return updateNearParkinglot(id,user)
}
exports.deleteNearParkinglot = (id) =>{
    return deleteNearParkinglot(id)
}