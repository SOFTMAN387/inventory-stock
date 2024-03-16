import Order from "../models/order.model.js";
// import { errorHandler } from '../middleware/error.js';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

//create Order

export const createOrder = async(req, res) => {
    const {OrderImage,title,price,quantity,rating,category,sub_category,description}=req.body;
    if(!OrderImage|!title|!price|!quantity|!rating|!category|!sub_category|!description){
        res.status(400).json("Every field must required!...");
    }
    try {

        //create new Order
        const newOrder =new Order({
          OrderImage: req.body.OrderImage,
          title: req.body.title,
          price: req.body.price,
          quantity: req.body.quantity,
          rating: req.body.rating,
          category: req.body.category,
          sub_category:req.body.sub_category,
          description: req.body.description
        });
    
        //save Order and respond
        const Order = await newOrder.save();
        res.status(200).json(Order);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  };

//update Order

export const updateOrder = async (req, res) => {
  try {
    if(req.params.id){
      const Order = await Order.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
      res.status(200).json({msg:"Order Updated Successful",Order});
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
   const delOrder= await Order.findByIdAndDelete({_id:req.params.id},{new:true});
    res.status(200).json({msg:'Order has been deleted...',delOrder});
  } catch (error) {
    next(error);
  }

}