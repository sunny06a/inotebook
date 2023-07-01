const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
router.post('/',[
    body('name').isLength({ min: 4 }).withMessage("min. 4 chracter"),
    body('email').isEmail().withMessage("enter valid email"),
    body('password').isLength({ min: 8 }).withMessage("min 8 character"),
],(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    
    User.create(req.body) //  to send message when duplicate email .then(user=>res.json(user)).catch(err=>console.log(err));
    res.send(req.body)
})
module.exports=router