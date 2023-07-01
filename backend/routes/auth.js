const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //password hashing
const jwt = require("jsonwebtoken");
const fetchUser=require('../middleware/fetchUser')

router.post(
  "/createuser",
  [
    //check for validation
    body("name").isLength({ min: 4 }).withMessage("min. 4 chracter"),
    body("email").isEmail().withMessage("enter valid email"),
    body("password").isLength({ min: 8 }).withMessage("min 8 character"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    //check unique email in database
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json("email already exsist");
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
      //for sign in web token
      const data = {
        user: {
          id: User.id,
        },
      };
      const auth_token = jwt.sign(data, "sunny123");
      res.json({ auth_token: auth_token });
    } catch (error) {
      console.error(error.message);
      res.json("some error occured");
    }
  }
);

router.post("/login",
  [
    //check for validation
    body("email").isEmail().withMessage("enter valid email"),
    body("password").exists().withMessage("cant be blank"),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.json("Enter correct details");
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.json("Enter correct details");
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(data,"sunny123");
      res.send({ auth_token });
    } catch {
      console.error(error.message);
      res.json("some error occured");
    }
  }
);

//route 3 get looging details of user

router.post("/getuser", fetchUser,async (req, res) => {
  try {
    const user_id=req.user;
    console.log(user_id)
    const user = await User.findById(user_id.id).select("-passowrd");
    res.json(user);
  } catch {
    console.error(error.message);
    res.json("some error occured");
  }
});
module.exports = router;
