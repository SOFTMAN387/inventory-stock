import express from 'express';
import dotenv from 'dotenv';
import cloudinary from "cloudinary"
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import orderRoutes from './routes/order.route.js';
import cors from "cors";
//import path from "path";
// import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import connectDB from './mongoDB/connect.js';
 import path from 'path';
dotenv.config();
          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINAYR_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});
const port=8000;

const app = express();

const corsOptons={
  origin:true,
};
app.use(cors(corsOptons));


//Deployment Code starts in For MERN STACK productions=====================

const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/Frontend/build')));

    app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'build', 'index.html'));
});


//Deployment Code ends in productions=====================


app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
// app.use('/api/auth', authRoutes);

app.get("/",(req,res)=>{
      res.send("Api is running successfully!....");
     })

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     statusCode,
//   });
// });



const startServer=async()=>{
  try {
     connectDB(process.env.MONGODB_URL);
    //  console.log(process.env.MONGODB_URL);
      app.listen(port,()=>console.log(`Server has been started at port ${port}`));
  } catch (error) {
      console.log(error);
  }
  
}

startServer();