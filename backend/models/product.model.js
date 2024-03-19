import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productImage: {
        type: Object,
        required:true,
        default:'https://tse4.mm.bing.net/th?id=OIP._7NaWYCqwXvv9uvQJ5SwzQHaHI&pid=Api&P=0&h=180'
      },
    title: {
      type: String,
      required: true
    },
    price: {
        type:Number,
        required: true
    },
    quantity: {
        type:Number,
        required: true
    },
     rating: {
        type:Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;