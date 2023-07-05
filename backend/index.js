//connect to server
const connecttoMongo = require("./db");
connecttoMongo();
const express = require("express");

//helps to perform curd operation
var cors = require("cors");

//run server at port 5000 as react running on 3000
const app = express();
const port = 5000;

//use is to use a middlware in routes
//MIDDLE WARE
app.use(cors());

//built in middleware to parse json request and add to req.body
app.use(express.json());

//homepage
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//route for api/auth and api/notes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Inotebook app listening on port ${port}`);
});
