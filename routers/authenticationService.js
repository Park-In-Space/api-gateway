var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = '18.220.231.43:8080'
const api = apiAdapter(BASE_URL)


router.post('/users/signup', (req, res) => {
    api.post(req.path, req.body).then(resp => {
      res.send(resp.data)
    })
  })

router.post('/users/signup', (req, res) => {
    api.post(req.path, req.body).then(resp => {
      res.send(resp.data)
    })
  })


module.exports = router