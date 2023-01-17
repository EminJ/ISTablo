const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../model/users')

router.post('/',async (req,res)=>{
    const { email, password } = req.body;
	if(!email || !password){return res.status(400).send(message('Eksik Veri Girişi!',400))}

    const user = await Users.findOne({ email });

    if (!user) return res.status(400).send(message('E-Posta Veya Şifre Hatalı',400))

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send(message('E-Posta Veya Şifre Hatalı',400))
    //if(req.session.user) return res.status(400).send(message('Zaten Bir Hesap Açık!',400))

    const payload = {user};
    const secret = process.env.SECURTY_KEY;
    const token = jwt.sign(payload, secret);
    //req.session.user=token
	return res.status(200).send(message(token,200))

})

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

module.exports = router;
