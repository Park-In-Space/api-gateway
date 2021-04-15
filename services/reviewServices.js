const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://3.135.244.105:3002/api/reviews/`
const axios = require('axios')
var users = require('./userServices');
var parking = require('./parkingManagerService');

async function makePostReview(review) {
    var x = await users.getById({userId:review.user_id.toString()});
    var y = await parking.getParkingById({id:review.parking_id});
    if(x===null||y===null){
        return null;
    }
    let res = await axios.post(url, review);    
    let data = res.data;
    //console.log(data)
    return data;    
}

async function makeGetReview(id){
    let res = await axios.get(`${url}${id.idreview}`);
    let data = res.data
    return data
}

async function makeGetAllReviews(){
    let res = await axios.get(url);
    let data = res.data
    return data
}

async function makeDeleteReview(id){
    let res = await axios.delete(`${url}${id.idreview}`);
    return res.status;
}

async function makeUpdateReview(data){
    var x = await users.getById({userId:review.user_id.toString()});
    var y = await parking.getParkingById({id:review.parking_id});
    if(x===null||y===null){
        return null;
    }

    let id = data.idreview;
    delete data.idreview;
    let res = await axios.put(`${url}${id}`,data)
    return res.data.message
}

exports.postReview = (review) =>{
   return makePostReview(review)
}

exports.getById = (id) =>{
    return makeGetReview(id)
}

exports.getAll = () =>{
    return makeGetAllReviews()
}

exports.updateReview = (id,data) =>{
    return makeUpdateReview(id,data)
}

exports.deleteReview =(id)=>{
    return makeDeleteReview(id)
}

