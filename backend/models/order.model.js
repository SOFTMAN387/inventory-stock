import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userOrderData:{
        type:Object,
        required:true,
    },
    shippingAddress: {
        type:Object,
        required: true,
    },
     billingAddress: {
        type:Object,
        required: true,
    },
    paymentMode:{
        type:String,
        required:true,
    },
    token: {
        type:Object,
        required: true,
      },
    totalAmount: {
      type: Number,
    },
    userId:{
        type:String,
        required:true,
    },
    userOrderStatus:{
      type:String,
      default:"pending"
  }
  },
  { timestamps: true }
);


const Order = mongoose.model('Order', OrderSchema);

export default Order;