import React,{useState} from 'react';
import uploadImageToCloudinary from '../../utils/uploadImage';
import { View, ScrollView } from "@aws-amplify/ui-react";
const EditProduct = () => {
  const [selectedFile,setFile]=useState(null);
  // const [formData,setFormData]=useState({
  //   name:'',
  //   email:"",
  //   password:'',
  //   photo:null,
  //   gender:'',
  //   bloodType:'',
  // });

  const handleFileInputChang=async(e)=>{
    const file=e.target.files[0];
    const data=await uploadImageToCloudinary(file);
    if(data){
      setFile(data.url);
    }
  
    // setFormData({...formData,photo:data.url})
    console.log(data);
  }
  return (
   <>
    <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      >
          <br></br>
    <ScrollView width="100%">
  
  <div className="p-8 rounded border border-gray-200">
  <h1 className="font-medium text-xl">Edit Product</h1>
  <br/>
  <div className='w-full'>
            <label for="product-img" className="text-sm text-gray-700 block mb-1 font-medium">Product Image</label>
            <input type="file"  onChange={handleFileInputChang}
             name='photo' accept='.jpg, .png' id="product-img" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-auto" placeholder="Choose Image" />
          </div>
       <div className="max-w-sm rounded overflow-hidden shadow-lg"><br/>
      <img className="w-full" src={`${selectedFile===null?"https://tse1.mm.bing.net/th?id=OIP.F4eiZn0Wjgp4EFtocph2BAAAAA&pid=Api&P=0&h=180":selectedFile}`} alt="Product_thumnail" />
    </div>
    <div className="mt-8 grid lg:grid-cols-2 gap-4">
      <div>
        <label for="title" className="text-sm text-gray-700 block mb-1 font-medium">Title</label>
        <input type="text" name="name" id="title" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter Title" />
      </div>

      <div>
        <label for="price" className="text-sm text-gray-700 block mb-1 font-medium">Price</label>
        <input type="number" name="price" id="price" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter Price" />
      </div>

      <div>
        <label for="quantity" className="text-sm text-gray-700 block mb-1 font-medium">Quantity</label>
        <input type="number" name="quantity" id="quantity" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter Qyantity" />
      </div>

      <div>
        <label for="rating" className="text-sm text-gray-700 block mb-1 font-medium">Rating</label>
        <input type="number" name="rating" id="rating" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter Rating" />
      </div>
    </div><br/>
    <div>
    <label for="category" className="text-sm text-gray-700 block mb-1 font-medium">Category</label>
    <select id="category" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block  focus:border-blue-500 text-gray-700 w-full">
      <option selected>Mens</option>
      <option value="">Womens</option>
      <option value="">Kids</option>
      <option value="">Books</option>
      <option value="">Fashion</option>
      <option value="">Electronics</option>
      <option value="">Sports</option>
      <option value="">Home & Kitchen</option>
    </select>
      
    </div><br/>
    <div>
        <label for="sub-category" className="text-sm text-gray-700 block mb-1 font-medium">Sub Category</label>
        <input type="text" name="sub-category" id="sub-category" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter Sub Category" />
      </div>
      <br/>
      <div className="relative w-full min-w-[200px]">
    <textarea
      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-teal-100 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-green-500 placeholder-shown:border-t-green-500 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
      placeholder=" "></textarea>
    <label
      className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-green-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-green-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-green-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-green-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
     Write Description..
    </label>
  </div>
    <div className="space-x-4 mt-8">
      <button type="submit" className="py-2 px-4 bg-teal-500 text-white rounded hover:bg-teal-600 active:bg-blue-700 disabled:opacity-50">Update</button>

      <button className="py-2 px-4 bg-red-500 border border-gray-200 text-white rounded hover:bg-red-700 active:bg-gray-200 disabled:opacity-50">Cancel</button>
    </div>
</div>

   </ScrollView>
      </View>
</>
  )
}

export default EditProduct;