const router = require('express').Router();
const multer = require('multer')
const jwt = require('jsonwebtoken')
const Tablo = require('../model/tablo')


router.post('/upload', async (req, res) => {
	const { token, title, explanation, category, type, images, size, color, price } = req.body
	if (!token || !title || !explanation || !category || !type || !images || !size || !color || !price) return res.status(400).send(message('Eksik Veri Girişi!', 400))

	new Tablo({ title, explanation, category, type, images, size, color, price })
		.save()
		.then((tablo) => {
			return res.status(200).send(message(tablo, 200))
		})
		.catch((err) => {
			return res.status(500).send(message('Kayıt Başarısız, Sistemde Bir Hata Olmuş Olmalı!', 500))
		})
});

function message(message, status) { return { send: 'Istanbul Tablo', message: message, status: status } }

module.exports = router;

