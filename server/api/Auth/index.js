const router = require('express').Router();
const create = require('./create')
const login = require('./login')

//router.get('/test',async (req,res)=>{
//	if(req.session.user) return res.status(200).send(message(req.session.user,200));
//	return res.status(200).send(message('no',400));
//})

router.use('/create',create)
router.use('/login',login)

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}


module.exports = router;