import Product from "../models/product.model.js";
import cloudinary from 'cloudinary';

// import { errorHandler } from '../middleware/error.js';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

//create Product

export const createProduct = async(req, res) => {
    const {productImage,title,price,quantity,rating,category,sub_category,description}=req.body;
    if(!productImage|!title|!price|!quantity|!rating|!category|!sub_category|!description){
       return res.status(400).json("Every field must required!...");
    }
    try {

        //create new Product
        const newProduct =new Product({
          productImage: req.body.productImage,
          title: req.body.title,
          price: req.body.price,
          quantity: req.body.quantity,
          rating: req.body.rating,
          category: req.body.category,
          sub_category:req.body.sub_category,
          description: req.body.description
        });
    
        //save Product and respond
        const product = await newProduct.save();
        if(product){
          return res.status(200).json(product);
        }
       
      } catch (err) {
        console.log(err);
      return res.status(500).json(err);
      }
  };

//update Product

export const updateProduct = async (req, res) => {
  try {
    if(req.params.id){
    //Finding and updating cloudinary image========================
    const findProductImg=await Product.findById(req.params.id);
    const imgPublicId=findProductImg?.productImage?.public_id;
    await cloudinary.v2.uploader.destroy(imgPublicId, function(error,result) {
      if(result){
        return res.status(200).json({result});
       } else{
        return res.status(200).json({msg:error});
       }
    }); 
    const product = await Product.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
    if(!product){
      return res.status(400).json("Not Found!...");
    }else{
    return res.status(200).json({msg:"Product Updated Successful",product});
    }
  }
  } catch (error) {
   return res.status(500).json(error);
  }
};



//Find All Products================================
export const getAllProducts=async(req,res)=>{
  try {
    const findAllProducts = await Product.find({});
    if(!findAllProducts){
    return res.status(400).json("Not Found!...");
    }else{
   return res.status(200).json({msg:"Product Found Successful",findAllProducts});
    }
  } catch (error) {
   return res.status(500).json(error);
  }
}


//Find Product By Id ================================
export const getProduct=async(req,res)=>{
  try {
    const id=req.params.id;
    if(!id){
    return res.status(400).json("No Product Id !...");
    }
    const findProduct = await Product.find({_id:id});
    if(!findProduct){
     return res.status(400).json("Not Found!...");
    }else{
    return res.status(200).json({msg:"Product Found Successful",findProduct});
    }
  } catch (error) {
   return res.status(500).json(error);
  }
}


// delete Product========================
export const deleteProduct = async (req, res, next) => {
  try {
    //Finding and Deleting cloudinary image========================
    const findProductImg=await Product.findById(req.params.id);
   const imgPublicId=findProductImg?.productImage?.public_id;
    await cloudinary.v2.uploader.destroy(imgPublicId, function(error,result) {
      if(result){
        return res.status(200).json({result});
       } else{
        return res.status(200).json({msg:error});
       }
    }); 

  const DelProduct= await Product.findByIdAndDelete({_id:req.params.id},{new:true});
  if(DelProduct){
    return res.status(200).json({msg:'Product has been deleted...'});
  }
  } catch (error) {
    next(error);
  }

}