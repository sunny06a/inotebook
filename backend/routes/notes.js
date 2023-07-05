const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//create new note
router.post(
  "/addnote",
  fetchUser,
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title must be min. 5 character"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be min. 10 character"),
  ],
  async (req, res) => {
    //form validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      //create new document in notes schema
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.json("some error occured, cant save note");
    }
  }
);

//get all notes
router.get("/fetchnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//update note
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  //create a note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  //check if updating a valid note
  var note = await Notes.findById(req.params.id);
  if (!note) {
    res.send("not found");
  }
  //if user id dont match
  if (note.user.toString() !== req.user.id) {
    return res.send("not allowed");
  }
  //update note
  const temp = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json(note);
});

//delete node
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  //const {title,description,tag}=req.body;
  try {
    var note = await Notes.findById(req.params.id);
    if (!note) {
      res.send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json("suceesss");
  } catch (error) {
    console.error(error.message);
    res.json("some error occured");
  }
});

module.exports = router;
