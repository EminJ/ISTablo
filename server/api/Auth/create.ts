import express from "express";
const router = express.Router()

router.post('/',(req,res)=>{
	const {name,email,password}=req.body
	if(!name || !email || !password){
		return res.status(400).send(message('Eksik Veri Girişi!',400))
	}
	if (!isNameValid(name)) {
		return res.status(400).send(message('İsim En Az 3 Harfli Olmalıdır!',400))
	}
	if (!isEmailValid(email)) {
		return res.status(400).send(message('Geçersiz E-Posta Adresi Girişi!',400))
	}
	if (!isPasswordValid(password)) {
		return res.status(400).send(message('Şifre Girişi En Az 8 Karakterli Ve En Az 1 Büyük Harf İçermeli!',400))
	}
	
	return res.status(200).send(message('Tebrikler, Hesap Oluşturuldu!',200))
})

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

function isNameValid(name) {
	return name.length >= 3
}
function isEmailValid(email) {
	//regex for email validation
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return emailRegex.test(email)
}
function isPasswordValid(password) {
	//regex for password validation
	const passwordRegex = /^(?=.*[A-Z]).{8,}$/
	return passwordRegex.test(password)
}

export default router;
