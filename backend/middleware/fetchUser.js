var jwt=require('jsonwebtoken');

const fetchUser=(req,res,next)=>{
    //get user id from the jwt token
    const token=req.header('auth_token');
    if(!token){
        res.json("no token availble");
    }
    try{
    const data=jwt.verify(token,"sunny123");
    req.user=data.user;
    next();
    }catch(error){
        res.send("error");
    }
}

module.exports=fetchUser;