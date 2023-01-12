import express from "express";
const router = express.Router()
import create from './create'
import login from './login'

router.use('/create',create)
router.use('/login',login)

export default router;
