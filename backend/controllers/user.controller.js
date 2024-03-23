import User from '../models/user.model.js';
import cloudinary from "cloudinary";
// import { errorHandler } from '../middleware/error.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const genToken=user=>{
  return jwt.sign({id:user._id,role:user.role},process.env.JWT_TOKEN_KEY,{
      expiresIn:"2d",
  })
}

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

//create User

export const createUser = async(req, res) => {
    try {
      //Checking User Exists or Not=============
       const CheckUser = await User.findOne({ email:req.body.email });
       CheckUser && res.status(400).json("Email Already Exists...");

        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //create new user
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          mobile: req.body.mobile,
          profile: req.body.profile,
          role: req.body.role,
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.profilePicture,
        });
    
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  };


  export const loginUser=async(req,res)=>{
    try {
      //find user
      const user = await User.findOne({ email:req.body.email });
      if(!user){
       return res.status(400).json({msg:"Wrong email or password"});
      }
       
  
      //validate password=========================
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if(!validPassword){
        return res.status(400).json({msg:"Wrong email or password"});

      }

      //Generating Json Web Token==================
      const token=genToken(user);
      const {password,...rest}=user._doc
      return res.status(200).json({status:true,msg:"Successfully LogedIn..",token,user:{...rest}});

      // const token = jwt.sign({ id:user._id }, process.env.JWT_TOKEN_KEY);
      // const expiryDate = new Date(Date.now() + 3600000*24); 
       //send response
      // return res
      //   .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      //   .status(200)
      //   .json({msg:"Loged In Successful",user});

    } catch (err) {
    return  res.status(500).json({status:false,msg:"Login Failed!.."});
    }

  }

//update user

export const updateUser = async (req, res) => {
  try {
    if(req.params.id){
        //Finding and updating cloudinary image========================
     const findUserImg=await User.findById(req.params.id);
     const imgPublicId=findUserImg?.UserImage?.public_id;
     await cloudinary.v2.uploader.destroy(imgPublicId, function(error,result) {
     res.status(200).json({msg:error,result}); }); 
      const user = await User.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
      res.status(200).json({msg:"User Updated Successful",user});
  }
    // if (req.body.password) {
    //   req.body.password = bcrypt.hashSync(req.body.password, 10);
    // }

    // const updatedUser = await User.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: {
    //       firstname: req.body.firstname,
    //       lastname: req.body.lastname,
    //       mobile: req.body.mobile,
    //       profile: req.body.profile,
    //       role: req.body.role,
    //       email: req.body.email,
    //       password: hashedPassword,
    //       profilePicture: req.body.profilePicture,
    //     },
    //   },
    //   { new: true }
    // );
   // const { password, ...rest } = updatedUser._doc;

   
  } catch (error) {
    res.status(500).json(err);
  }
};

export const forgotPassword=async(req,res)=>{
  try {
    if(req.params.id){
       if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
      const user = await User.findByIdAndUpdate({_id:req.params.id},{$set:{password:req.body.password}},{new:true});
      res.status(200).json({msg:"Forgot Password Updated Successful",user});
  }
  } catch (error) {
    res.status(500).json(err);
  }

}



//Find All Users================================
export const getAllUsers=async(req,res)=>{
  try {
    const findAllUsers = await User.find({});
    !findAllUsers && res.status(400).json("Not Found!...");
    res.status(200).json({msg:"User Found Successful",findAllUsers});
  } catch (error) {
    res.status(500).json(err);
  }
}


//Find User By Id ================================
export const getUser=async(req,res)=>{
  try {
    const id=req.params.id;
    !id && res.status(400).json("No User Id !...");

    const findUser = await User.find({_id:id});
    !findUser && res.status(400).json("Not Found!...");
    res.status(200).json({msg:"User Found Successful",findUser});
  } catch (error) {
    res.status(500).json(err);
  }
}


// delete user========================
export const deleteUser = async (req, res, next) => {
  try {
     //Finding and deleting cloudinary image========================
     const findUserImg=await User.findById(req.params.id);
     const imgPublicId=findUserImg?.UserImage?.public_id;
     await cloudinary.v2.uploader.destroy(imgPublicId, function(error,result) {
     res.status(200).json({msg:error,result}); }); 
    const delUser= await User.findByIdAndDelete({_id:req.params.id},{new:true});
    res.status(200).json({msg:'User has been deleted...',delUser});
  } catch (error) {
    next(error);
  }

}