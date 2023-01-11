import * as mongoose from "mongoose";
import express from "express";
//import session from "express-session";
import Auth from './api/auth'

const app = express();

app.use(express.json());
	mongoose
		.set('strictQuery', false)
		.connect(process.env.MONGODB_URL)
		.then(() => console.log(`Connected to DB`))
		.catch((e) => console.log(e));

//app.use(session({
//  secret: process.env.SECRET_KEY,
//  resave: false,
//  saveUninitialized: true,
//}));

app.use('/auth',Auth)

export default app;
