const router = require('express').Router();
const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const Tablo = require('../model/tablo')

router.post('/get-item'), async (req, res) => {
    const item = await Tablo.findOne({tabloid:req.body.id});
    return res.status(200).send(message("a",200))
}

router.post('/show', async (req, res) => {
    const {token}=req.body
    let urunler=[]
    if(!token) return res.status(400).send(message('Token Bulunamadı!',400))
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const users = await Users.findById(decoded.user._id).then((response) => response)
            for (let i = 0; i < users.sepet.length; i++) {
                const element = users.sepet[i];
                const item = await Tablo.findOne({ tabloid: element.id });
                urunler.push([{item:item},{settings:element}])
            }
            res.status(200).send(message(urunler,200));
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

router.post('/favorite', async (req, res) => {
    const {token}=req.body
    let urunler=[]
    if(!token) return res.status(400).send(message('Token Bulunamadı!',400))
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const users = await Users.findById(decoded.user._id).then((response) => response)
            for (let i = 0; i < users.favoriler.length; i++) {
                const element = users.favoriler[i];
                const item = await Tablo.findOne({ tabloid: element.id });
                if(item!=null) urunler.push([{item:item}])
            }
            res.status(200).send(message(urunler,200));
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

router.post('/addfavorite', async (req, res) => {
    const {id,token}=req.body
    let bulunuyor=0
    if(!token || !id){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            for (let i = 0; i < user.favoriler.length; i++) {
                const element = user.favoriler[i];
                if(element==id) bulunuyor=1
            }
            if(bulunuyor==0) user.favoriler.push({id:id});
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

router.post('/delfavorite', async (req, res) => {
    const {id,token}=req.body
    if(!req.body.token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try{
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            let productIndex = -1
            for (let i = 0; i < user.favoriler.length; i++) {
                const element = user.favoriler[i];
                if(element.id==id) productIndex=i
            }
            if (productIndex === -1) return res.status(400).send(message('Ürün Sepette Bulunamadı!',400))
            user.favoriler.splice(productIndex, 1);
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    }catch(err){
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

router.post('/add-to-cart', async (req, res) => {
    const {id,size,color,token}=req.body
    if(!token || !id){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try {
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            user.sepet.push({id,size,color});
            await user.save();
            return res.status(200).send(message(user,200))
        }
        else return res.status(400).send(message('Hata Oluştu!',400))
    } catch (error) {
        return res.status(400).send(message('Hata Oluştu!',400))
    }
});

router.post('/remove-from-cart', async (req, res) => {
    const {id,size,color,token}=req.body
    if(!req.body.token){
        return res.status(400).send(message('Token Bulunamadı!',400))
    }
    try{
        const decoded = jwt.verify(req.body.token, process.env.SECURTY_KEY);
        if(decoded){
            const user = await Users.findById(decoded.user._id);
            let productIndex = -1
            for (let i = 0; i < user.sepet.length; i++) {
                const element = user.sepet[i];
                if(element.id==id && element.size == size && element.color == color) productIndex=i
            }
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

