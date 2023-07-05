//middleware to fetch user throught authentication with api end to secure routes (other alternate cookies and session only for browser )
var jwt = require("jsonwebtoken");
const fetchUser = (req, res, next) => {
  //get user id from the jwt token
  const token = req.header("auth_token");
  if (!token) {
    res.json("No token availble");
  }
  try {
    const data = jwt.verify(token,'secert');
    req.user = data.user;
    next();
  } catch (error) {
    res.send("!Error cant get user");
  }
};

module.exports = fetchUser;
