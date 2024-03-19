import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name:process.env.CLOUDINAYR_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET 
});