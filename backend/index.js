import express from 'express';
import dotenv from 'dotenv';
import cloudinary from "cloudinary"
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import orderRoutes from './routes/order.route.js';
import cors from "cors";
import path from "path";
// import authRoutes from './routes/auth.route.js';
// import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './mongoDB/connect.js';
dotenv.config();
          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINAYR_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});
const port=process.env.PORT||5000;
const app = express();

const corsOptons={
  origin:true,
};



app.use(cors(corsOptons));
app.use(express.json());
app.use(cookieParser());


app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
// app.use('/api/auth', authRoutes);

//Deployment Code starts in For MERN STACK productions=====================
    const __dirname = path.resolve();  
    if(process.env.NODE_ENV==="production"){
      app.use(express.static(path.join(__dirname, './Frontend/build')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'Frontend', 'build', 'index.html'));
    });
    }else{
      app.get("/",(req,res)=>{
        res.send("Api is Running........");
      })
    }
    
    


//Deployment Code ends in productions=====================



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