const router = require('express').Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
        username: { type: String, required: true },
        password: { type: String, required: true },
    }
);

const Users = mongoose.model('admin', UserSchema)

router.post('/login',async (req,res)=>{
    console.log(Users);
    const { username, password } = req.body;
	if(!username || !password){return res.status(400).send(message('Eksik Veri Girişi!',400))}

    const user = await Users.findOne({ username, password });
  
    if (!user) return res.status(400).send(message('Kullanıcı Adı Veya Şifre Hatalı',400))

    const payload = {user};
    const secret = process.env.SECURTY_KEY;
    const token = jwt.sign(payload, secret);
    //req.session.user=token
	return res.status(200).send(message(token,200))

})

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

module.exports = router;
