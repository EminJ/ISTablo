const mongoose = require('mongoose')
const express = require('express')
//const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv').config()
const Auth = require('./api/auth/')
const PORT= 1000

const app = express();

var corsOptions = {
	origin: '*',
  }
app.use(cors(corsOptions))
app.use(express.json());
mongoose
	.set('strictQuery', false)
	.connect(process.env.MONGODB_CONNECT)
	.then(() => console.log('MongoDB bağlantısı kuruldu!'))
	.catch((e) => console.log('MongoDB bağlantısı sırasında hata oluştu'));

//app.use(session({
//	secret: process.env.SECURTY_KEY,
//	resave: false,
//	saveUninitialized: true,
//	cookie: { secure: false }
//  }));

app.use('/api/auth',Auth)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});