const mongoose = require('mongoose')
const express = require('express')
const multer  = require('multer')
const path = require('path')
//const session = require('express-session')
const cors = require('cors')
const dotenv = require('dotenv').config()
const Auth = require('./api/auth/')
const Store = require('./api/store')
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

let filename=''
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, './images'))
	},
	filename: (req, file, cb) => {
		filename=Date.now() + file.originalname.substring(file.originalname.length - 4)
		cb(null, filename)
	}
})
const upload = multer({storage})

app.post('/uploads', upload.single('filename'), (req, res) => {
	res.status(200).send({message:filename})
})

app.use('/api/auth',Auth)
app.use('/api/store',Store)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});