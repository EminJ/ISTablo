const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../model/users')

router.post('/cartadd',async (req,res)=>{
	const {token,cartname,cartnum,cartdate,cartcvc}=req.body
	if(!token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            user.kartbilgileri.push({cartname,cartnum,cartdate,cartcvc});
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
})

router.post('/adresadd',async (req,res)=>{
	const {token,adresbaslik,adres}=req.body
	if(!token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            user.adres.push({adresbaslik,adres});
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
})

router.post('/adresdell',async (req,res)=>{
	const {token,adresbaslik,adres}=req.body
	if(!token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
	try{
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            let productIndex = -1
            for (let i = 0; i < user.adres.length; i++) {
                const element = user.adres[i];
                if(element.adresbaslik==adresbaslik && element.adres==adres) productIndex=i
            }
            if (productIndex === -1) return res.status(400).send(message('Adres Bulunamadı!',400))
            user.adres.splice(productIndex, 1);
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    }catch(err){
        return res.status(400).send(message('Hata Oluştu!',400))
    }
})

router.post('/cartdell',async (req,res)=>{
	const {token,cartnum,cartdate,cartname}=req.body
	if(!token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
	try{
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            let productIndex = -1
            for (let i = 0; i < user.kartbilgileri.length; i++) {
                const element = user.kartbilgileri[i];
				
                if(element.cartnum==cartnum && element.cartdate==cartdate && element.cartname==cartname) productIndex=i
            }
            if (productIndex === -1) return res.status(400).send(message('Adres Bulunamadı!',400))
            user.kartbilgileri.splice(productIndex, 1);
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    }catch(err){
        return res.status(400).send(message('Hata Oluştu!',400))
    }
})

router.post('/addphone',async (req,res)=>{
	const {token,phone}=req.body
	if(!token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            user.phone=phone;
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
})

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

module.exports = router;

