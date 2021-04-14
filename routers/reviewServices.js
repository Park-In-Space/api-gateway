const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://3.135.244.105:3002/api/reviews/`
const axios = require('axios')

// exports.getById = (id) =>{
//     return new Promise((resolve, reject)=>{
//         http.get(`${url}${id.idreview}`,(res)=>{
//             let data = ''
//             res.on('data', (chunk) => {
//                 data += chunk;
//               });
            
//               res.on('close', () => {
//                 console.log(data)
//                 resolve(JSON.parse(data))
//               });
            
//         })
//     }) 
// }

async function makePostReview(review) {
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

async function makeDeleteReview(id){
    let res = await axios.delete(`${url}${id.idreview}`);
    return res.status;
}

async function makeUpdateReview(data){
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

exports.updateReview = (id,data) =>{
    return makeUpdateReview(id,data)
}

exports.deleteReview =(id)=>{
    return makeDeleteReview(id)
}