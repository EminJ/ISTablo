const router = require('express').Router();
const multer = require('multer')
const jwt = require('jsonwebtoken')
const Tablo = require('../model/tablo')

router.get('/item', (req, res) => {
	Tablo.find({}, (err, items) => {
		if (err) return res.status(400).send(err);
		res.send(items);
	  });
});

router.get('/item/:id', (req, res) => {
	Tablo.findOne({ tabloid: req.params.id }, (err, item) => {
	  if (err) return res.status(400).send(err);
	  res.status(200).send(item);
	});
});

router.post('/upload', async (req, res) => {
	const { token, title, explanation, category, type, images, size, color, price } = req.body
	if (!token || !title || !explanation || !category || !type || !images || !size || !color || !price) return res.status(400).send(message('Eksik Veri Girişi!', 400))

	new Tablo({ title, explanation, category, type, images, size, color, price,tabloid:Math.floor(Math.random() * 999999999999999) + 10000000000000})
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

