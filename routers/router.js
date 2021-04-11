var express = require('express');
var router = express.Router()
var authenticationService = require('./authenticationService')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(authenticationService)

module.exports = router