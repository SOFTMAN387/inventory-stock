import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productImage: {
        type: String,
        default:'https://tse4.mm.bing.net/th?id=OIP._7NaWYCqwXvv9uvQJ5SwzQHaHI&pid=Api&P=0&h=180'
      },
    title: {
      type: String,
      require: true
    },
    price: {
        type:Number,
        require: true
    },
    quantity: {
        type:Number,
        require: true
    },
     rating: {
        type:Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    subcategory: {
        type: String,
        require: true
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