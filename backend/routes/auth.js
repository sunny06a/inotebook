const express=require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');


router.post('/',[
    //check for validation
    body('name').isLength({ min: 4 }).withMessage("min. 4 chracter"),
    body('email').isEmail().withMessage("enter valid email"),
    body('password').isLength({ min: 8 }).withMessage("min 8 character"),

],async (req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    //check unique email in database
    try{
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.json('email already exsist')
    }
    else{
        //password hashing
        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass    
        });
    }
    res.send(user);
     } catch(error){
        console.error(error.message);
        res.json("some error occured");
     }

})
module.exports=router