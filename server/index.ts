import * as mongoose from "mongoose";
import express from "express";
import session from "express-session";
import Auth from './api/auth'

const app = express();

app.use(express.json());
mongoose
	.set('strictQuery', false)
	.connect(process.env.MONGODB_CONNECT)
	.then(() => console.log('MongoDB bağlantısı kuruldu!'))
	.catch((e) => console.log('MongoDB bağlantısı sırasında hata oluştu'));

app.use(session({
	secret: process.env.SECURTY_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
  }));
  
app.use('/auth',Auth)

export default app;
