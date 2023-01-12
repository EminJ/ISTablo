import express from "express";
const router = express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Users from '../model/users'

router.get('/log',async (req,res)=>{
	req.session.user="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJhYXNkZGFzZCIsImVtYWlsIjoiYXNkQGFhc2QuYWFkc2FhcyIsInBhc3N3b3JkIjoiJDJiJDEwJFJUL0VvcHFQZXR1UGtzUUM0VmIxRC5COVVjdHd4OFBBWVh6UXk0eXFpbTdXcTVoMmZVUHRHIiwic2lwYXJpc2xlciI6W10sImthcnRiaWxnaWxlcmkiOltdLCJzZXBldCI6W10sImZhdm9yaWxlciI6W10sImFkcmVzIjpbXSwiX2lkIjoiNjNjMDI4ZTYyZDQ3YjM0YjczNDMxZjAxIiwiY3JlYXRlZEF0IjoiMjAyMy0wMS0xMlQxNTozNjowNi42MDhaIiwidXBkYXRlZEF0IjoiMjAyMy0wMS0xMlQxNTozNjowNi42MDhaIiwiX192IjowfSwiaWF0IjoxNjczNTM3NzY2LCJleHAiOjE3MDUwNzM3NjZ9.NnoZDZAcVmGvzU_1SMl0jsdmZb3rTn8qfXGcV6-NXAw"
	res.send('ok')
})

router.get('/test',async (req,res)=>{
	if(req.session.user) return res.status(200).send(message(req.session.user,200));
	return res.status(400).send(message('no',400));
})

router.post('/',async (req,res)=>{
	const {name,email,password}=req.body
	if(!name || !email || !password){return res.status(400).send(message('Eksik Veri Girişi!',400))}
	if (!isNameValid(name)) {return res.status(400).send(message('İsim En Az 3 Harfli Olmalıdır!',400))}
	if (!isEmailValid(email)) {return res.status(400).send(message('Geçersiz E-Posta Adresi Girişi!',400))}
	if (!isPasswordValid(password)) {return res.status(400).send(message('Şifre Girişi En Az 8 Karakterli Ve En Az 1 Büyük Harf İçermeli!',400))}
    if(req.session.user) return res.status(400).send(message('Zaten Bir Hesap Açık!',400))

	const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).send(message('Bu E-Posta Adresi Zaten Kullanılıyor!',400));
    }
	const hashedPassword = await bcrypt.hash(password, 10);

	new Users({ name, email, password: hashedPassword })
	.save()
	.then((user)=>{
		const payload = {user};
		const secret = process.env.SECURTY_KEY;
		const token = jwt.sign(payload, secret);
		req.session.user=token
		return res.status(200).send(message('Tebrikler, Hesap Oluşturuldu!',200))
	})
	.catch((err)=>{
		return res.status(500).send(message('Kayıt Başarısız, Sistemde Bir Hata Olmuş Olmalı!',500))
	})
	
})

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

function isNameValid(name) {
	return name.length >= 3
}
function isEmailValid(email) {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return emailRegex.test(email)
}
function isPasswordValid(password) {
	const passwordRegex = /^(?=.*[A-Z]).{8,}$/
	return passwordRegex.test(password)
}

export default router;
