const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Users = require('../model/users')


router.post('/add-to-cart/:id', async (req, res) => {
    if(!req.body.token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const productId = req.params.id;
            const user = await Users.findById(decoded.user._id);
            user.sepet.push(productId);
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

router.delete('/remove-from-cart/:id', async (req, res) => {
    if(!req.body.token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try{
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            const productIndex = user.sepet.indexOf(req.params.id);
            if (productIndex === -1) return res.status(400).send(message('Ürün Sepette Bulunamadı!',400))
            user.sepet.splice(productIndex, 1);
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    }catch(err){
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});


function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

module.exports = router;

