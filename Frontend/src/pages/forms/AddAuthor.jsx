import React,{useState} from 'react'
import { View} from "@aws-amplify/ui-react";
import uploadImageToCloudinary from '../../utils/uploadImage';
const AddAuthor = () => {
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
      > <br></br>
    <h3 className='text-xl font-bold'>Add New Author</h3>
    <br/>
    <div className='w-full'>
            <label for="author-img" className="text-sm text-gray-700 block mb-1 font-medium">Author Image</label>
            <input type="file"  onChange={handleFileInputChang}
             name='photo' accept='.jpg, .png' id="author-img" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-auto" placeholder="Choose Image" />
          </div>
       <div className="max-w-sm rounded overflow-hidden shadow-lg"><br/>
      <img className="w-full" src={`${selectedFile===null?"https://tse1.mm.bing.net/th?id=OIP.F4eiZn0Wjgp4EFtocph2BAAAAA&pid=Api&P=0&h=180":selectedFile}`} alt="Product_thumnail" />
    </div>
    <br/>
  <form className="w-full max-w-lg">
  <div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="first-name">
       First Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="first-name" type="text" placeholder="Enter First Name" />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter Last Name" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
       Email
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Email" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
       Mobile
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="Phone" />
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="profile">
       Profile
      </label>
      <div className="profile">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="profile">
          <option>FrontEnd</option>
          <option>Backend</option>
          <option>FullStack</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="profile">
     Role
      </label>
      <div className="role">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="role">
          <option>user</option>
          <option>admin</option>
          <option>super-admin</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    
  </div>
  <p className="text-red-500 text-xs italic">Please fill out this field.</p>
  <div className="flex items-center justify-between mt-5">
      <button className="bg-teal-500 hover:bg-teal-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
      Submit
      </button>

    </div>
</form>

 </View>
  </>
  )
}

export default AddAuthor