require('dotenv').config()
const jwt=require('jsonwebtoken');
const auth=async(req, res, next) => {
    try{
        const header=req?.headers['authorization'];
        const token=header?.split(" ")[1]
        if(!token){
            return res.status(401).send("token is not provided")
        }
    jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
        if(err){
            throw new Error(err.message)
        }
        if(data){
            req.user=data;
            console.log(data)
            next()
        }
    })  
    }catch(err){
        return res.status(500).send({err:err.message})
    }
    
}
module.exports = {auth}