const router = require('express').Router();
const jwt = require('jsonwebtoken')
const basket = require('./basket')

router.use('/basket',basket)

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}


module.exports = router;