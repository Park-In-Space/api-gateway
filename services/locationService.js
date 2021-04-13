const { rejects } = require('assert');
const http  = require('http');
const { resolve } = require('path');
const url = `http://3.135.244.105:3002/api/reviews/`

exports.getById = (id) =>{
    return new Promise((resolve, reject)=>{
        http.get(`${url}${id.idreview}`,(res)=>{
            let data = ''
            res.on('data', (chunk) => {
                data += chunk;
              });
            
              res.on('close', () => {
                console.log(data)
                resolve(JSON.parse(data))
              });
            
        })
    }) 
}

exports.pos