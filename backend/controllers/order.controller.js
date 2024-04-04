import Order from "../models/order.model.js";
import cloudinary from "cloudinary";
// import { errorHandler } from '../middleware/error.js';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

//create Order

export const createOrder = async(req, res) => {
    const {userOrderData,shippingAddress,billingAddress,paymentMode,paidToken,totalAmount,userId,userOrderStatus}=req.body;
    if(!userOrderData|!shippingAddress|!billingAddress|!paymentMode|!paidToken|!totalAmount|!userId|!userOrderStatus){
        res.status(400).json("Every field must required!...");
    }
    try {

        //create new Order
        const newOrder =new Order({
          userOrderData: req.body.userOrderData,
          shippingAddress: req.body.shippingAddress,
          billingAddress: req.body.billingAddress,
          paymentMode: req.body.paymentMode,
          paidToken: req.body.paidToken,
          totalAmount: req.body.totalAmount,
          userId:req.body.userId,
          userOrderStatus: req.body.userOrderStatus
        });
    
        //save Order and respond
        const order = await newOrder.save();
        if(!order){
          return res.status(400).json("Not Found!...");
        }else{
          return res.status(200).json({msg:"Order created Successful",order});
        }
      } catch (err) {
        console.log(err);
       return res.status(500).json(err);
      }
  };

//update Order

export const updateOrder = async (req, res) => {
  try {
    if(req.params.id){
     //Finding and updating cloudinary image========================
    const findOrderImg=await Order.findById(req.params.id);
    const imgPublicId=findOrderImg?.OrderImage?.public_id;
    await cloudinary.v2.uploader.destroy(imgPublicId, function(error,result) {
   if(result){
    return res.status(200).json({result});
   } else{
    return res.status(200).json({msg:error});
   }
   }); 
      const order = await Order.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
      if(!order){
        return res.status(200).json({msg:"Coudn't Update!"});
      }else{
     return res.status(200).json({msg:"Order Updated Successful",order});
      }
  }
   
  } catch (error) {
   return res.status(500).json(error);
  }
};


//update Order Status

export const updateOrderStatus = async (req, res) => {
  try {
    if(req.params.id){
      const order = await Order.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
      if(!order){
     return res.status(200).json({msg:"Couldn't Update"});
      }else{
     return res.status(200).json({msg:"Order Status Updated",order});
      }
  }
   
  } catch (error) {
   return res.status(500).json(error);
  }
};



//Find All Orders================================
export const getAllOrders=async(req,res)=>{
  try {
    const findAllOrders = await Order.find({});
    if(!findAllOrders){
    return res.status(400).json("Not Found!...");
    }else{
   return res.status(200).json({msg:"Order Found Successful",findAllOrders});
    }
  } catch (error) {
   return res.status(500).json(error);
  }
}


//Find Order By Id ================================
export const getOrder=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id){
      res.status(400).json("No Order Id !...");
    }
    const findOrder = await Order.find({_id:id});
    if(!findOrder){
    return res.status(400).json("Not Found!...");
    }else{
    return res.status(200).json({msg:"Order Found Successful",findOrder});

    }
  } catch (error) {
    res.status(500).json(error);
  }
}


// delete Order========================
export const deleteOrder = async (req, res, next) => {
  try {
    //Finding and deleting cloudinary image========================
    const findOrderImg=await Order.findById(req.params.id);
    const imgPublicId=findOrderImg?.OrderImage?.public_id;
    await cloudinary.v2.uploader.destroy(imgPublicId, function(error,result) {
      if(result){
        return res.status(200).json({result});
       } else{
        return res.status(200).json({msg:error});
       }
       }); 
   const delOrder= await Order.findByIdAndDelete({_id:req.params.id},{new:true});
   if(delOrder){
   return res.status(200).json({msg:'Order has been deleted...',delOrder});
   }
  } catch (error) {
    next(error);
  }

}