const express = require("express");
const User = require("../models/User"); //User schema
const router = express.Router();  
const { body, validationResult } = require("express-validator"); //form validator
const bcrypt = require("bcryptjs"); //password hashing
const jwt = require("jsonwebtoken");  //authentication
const fetchUser=require('../middleware/fetchUser')

//sign Up route
router.post(
  "/createuser",
  [
    //check for validation
    body("name").isLength({ min: 4 }).withMessage("Enter min. 4 chracter"),
    body("email").isEmail().withMessage("Enter valid email"),
    body("password").isLength({ min: 8 }).withMessage("Enter min 8 character"),
  ],
  async (req, res) => {
    //if some error in validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    //check unique email in database
    try {
      //check if email already exsist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json("Email already exsist");
      } else {
        //password hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
      }
      //for signin web token
      const data = {
        user: {
          id: User.id,
        },
      };
      const auth_token = jwt.sign(data, "secert");
      res.json({ auth_token: auth_token });
    } catch (error) {
      console.error(error.message);
      res.json("Some error occured");
    }
  }
);

//Login route
router.post("/login",
  [
    //check for validation
    body("email").isEmail().withMessage("Enter valid email"),
    body("password").exists().withMessage("cant be blank"),
  ],
  async (req, res) => {
    //form validation
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      //check if email exsist or not
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.json("Enter correct Email");
      }
      //Compare password
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.json("Enter correct password");
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      //if correct details than send web token
      const auth_token = jwt.sign(data,"secert");
      res.send({ auth_token });
    } catch {
      console.error(error.message);
      res.json("some error occured");
    }
  }
);

//route 3 get login details of user
router.post("/getuser", fetchUser,async (req, res) => {
  try {
    const user_id=req.user;
    //console.log(user_id)
    const user = await User.findById(user_id.id).select("-passowrd");
    //console.log(user)
    res.send(user);
  } catch {
    console.error(error.message);
    res.json("some error occured");
  }
});
module.exports = router;
