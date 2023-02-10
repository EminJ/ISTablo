const router = require('express').Router();
const jwt = require('jsonwebtoken')
const basket = require('./basket')
const frame = require('./frame')

router.use('/basket',basket)
router.use('/frame',frame)

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}


module.exports = router;