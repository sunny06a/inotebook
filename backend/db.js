//connect to mongodb server
const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/test"; //127.0.0.1 for local as node doesnt support localhost
const connecttoMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("successful connected to database")
}
module.exports=connecttoMongo;