const express=require('express');
const User=require('../models/User');
const router=express.Router();
router.post('/',(req,res)=>{
    
    User.create(req.body);
    res.send(req.body)
})
module.exports=router