import jwt from 'jsonwebtoken';
// import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;
    const authToken=req.headers.authorization;
    
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success:false,msg:"No token , authorizaton denied"})
    }

    try {
        const token=authToken.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_TOKEN_KEY);
        req.userId=decoded.id;
        req.role=decoded.role;
        next();
    } catch (error) {
        
        if(error.name==='TokenExpiredError'){
            return res.status(401).json({
                msg:"Token is expired"
            })
        }
        return res.status(401).json({success:false,
            msg:"Invalid Token"
        })
    }

}

export const isAdmin=async(req,res,next)=>{
    // const userId=req.userId;
    // let user;

    // const patient=await User.findById(userId);
    // const doctor=await Doctor.findById(userId);

    // if(patient){
    //     user=patient;

    // }
    
    // if(doctor){
    //     user=doctor;
        
    // }

    // if(!roles.includes(user.role)){
    //     return res.status(401).json({success:false,message:"You are not authorized.."});

    // }
    if(req.role==="Admin"){
        return res.status(401).json({success:false,msg:"Only, Super Admins are Authorized..."});
    }

    next();
}