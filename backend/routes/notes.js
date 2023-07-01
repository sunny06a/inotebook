const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')
const Notes=require('../models/Notes')
const { body, validationResult } = require("express-validator");
//create new note
router.post('/addnote',fetchUser,[

],async (req,res)=>{
    body("title").isLength({min:5}).withMessage(" title must be min 5 "),
    body("description").isLength({min:10}).withMessage("mini 10")
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try{
      const {title,description,tag}=req.body;
      const note= new Notes({
        title,description,tag,user:req.user.id
      })
      const saveNote=await note.save()
      res.json(saveNote);
    }
    catch (error) {
        console.error(error.message);
        res.json("some error occured");
      }
})

//get all notes
router.get('/fetchnotes',fetchUser, async (req,res)=>{
   const notes=await Notes.find({user:req.user.id});
   res.json(notes)
})
module.exports=router