const router = require('express').Router();
const jwt = require('jsonwebtoken')
const basket = require('./basket')
const frame = require('./frame')
const Users = require('../model/users')
const Siparis = require('../model/siparis')

router.use('/basket',basket)
router.use('/frame',frame)

router.post('/siparis', async (req, res) => {
    const {tablo,cart,Adres,token}=req.body
    if(!token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            new Siparis({ tabloid,size,color,cart,Adres,user })
	        .save()
	        .then((user)=>{
	        	return res.status(200).send(message('👍',200))
	        })
	        .catch((err)=>{
	        	return res.status(500).send(message('Başarısız, Sistemde Bir Hata Olmuş Olmalı!',500))
	        })
            
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}


module.exports = router;