import express from "express";
const router = express.Router()

router.post('/',(req,res)=>{
    res.send('sa')
})

function message(message,status) {return {send:'Istanbul Tablo',message:message,status:status}}

export default router;
