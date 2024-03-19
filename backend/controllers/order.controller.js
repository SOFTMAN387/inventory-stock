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
        res.status(200).json({msg:"Order created Successful",order});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
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
    res.status(200).json({msg:error,result}); }); 
      const order = await Order.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
      res.status(200).json({msg:"Order Updated Successful",order});
  }
   
  } catch (error) {
    res.status(500).json(error);
  }
};



//Find All Orders================================
export const getAllOrders=async(req,res)=>{
  try {
    const findAllOrders = await Order.find({});
    !findAllOrders && res.status(400).json("Not Found!...");
    res.status(200).json({msg:"Order Found Successful",findAllOrders});
  } catch (error) {
    res.status(500).json(err);
  }
}


//Find Order By Id ================================
export const getOrder=async(req,res)=>{
  try {
    const id=req.params.id;
    !id && res.status(400).json("No Order Id !...");

    const findOrder = await Order.find({_id:id});
    !findOrder && res.status(400).json("Not Found!...");
    res.status(200).json({msg:"Order Found Successful",findOrder});
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
    res.status(200).json({msg:error,result}); }); 
   const delOrder= await Order.findByIdAndDelete({_id:req.params.id},{new:true});
    res.status(200).json({msg:'Order has been deleted...',delOrder});
  } catch (error) {
    next(error);
  }

}