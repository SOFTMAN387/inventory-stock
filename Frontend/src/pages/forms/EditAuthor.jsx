import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { View} from "@aws-amplify/ui-react";
import { useNavigate,useParams } from 'react-router-dom';
import uploadImageToCloudinary from '../../utils/uploadImage';
import { BASE_URL } from '../../config';
import { useSelector } from 'react-redux';
const EditAuthor = () => {
  const navigate=useNavigate();
  const id=useParams().id;
  const userToken=useSelector((state)=>state?.currentUser[0]?.token);
  const [fileErr,setFileErr]=useState("");
  const [fileUrl,setFileUrl]=useState("");
  const [inputErr,setInputErr]=useState("");
  const[updateData,setUpdateData]=useState();
  const [fileData,setFileData]=useState();
console.log(updateData)
  const profileList = [
    {
        id: 1,
        value: 'Frontend'
    }, {
        id: 2,
        value: 'Backend'
    }, {
        id: 3,
        value: 'FullStack'
    }
   
    ]; 

      
  const roleList = [
    {
        id: 1,
        value: 'Admin'
    },{
        id: 2,
        value: 'Super-Admin'
    }
   
    ];
  const handleFileInputChang=async(e)=>{
    const file=e.target.files[0];
    const data=await uploadImageToCloudinary(file);

    if(data){
      setFileUrl(data?.url);
     setFileData({
      "url":data?.url,
      "public_id":data?.public_id,
      "asset_id":data?.asset_id,
      "original_filename":data?.original_filename
  })
    
    }
    // setFormData({...formData,photo:data.url})
    console.log(data);
  }

   
  const handleInputChange=(e)=>{
    e.preventDefault();
     setUpdateData({...updateData, [e.target.name]: e.target.value });

}



const updateAuthor=async()=>{
  try {
    const {first_name,last_name,email,mobile,profile,role,profilePicture}=updateData;
    if(first_name|last_name|email|mobile|profile|role|profilePicture ===""){
      setInputErr("Every field must required!...");
    }
    if(!fileData && !updateData?.profilePicture?.url){
      setFileErr("Please Select Product Img!...");
      return;
    }
      const res=await axios.patch(`${BASE_URL}/api/user/update/${id}`,
            {...updateData,profilePicture:fileData?.url?fileData:profilePicture},
            {
              headers:{
                    Authorization:`Bearer ${userToken}`
                }
            });
            console.log(res);
            res.status===200 && navigate("/admin/author");
   

  } catch (error) {
    console.log(error);
  }

}

useEffect(()=>{
  const fetchData=async()=>{
      try {
          
          const res=await fetch(`${BASE_URL}/api/user/${id}`
          ,{
           headers:{
                  Authorization:`Bearer ${userToken}`
              }
          }
          )
          const result= await res.json();
          if(!res.ok){
             throw new Error(result.message);
          }
          // console.log(result);
          setUpdateData(result.findUser[0]);
          
          
      } catch (error) {
         
           setInputErr(error.message);
      }
  }
  fetchData();
},[id,userToken]);



  return (
  <>
   <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
      > <br></br>
    <h3 className='text-xl font-bold'>Edit Author</h3>
    <br/>
    <div className='w-full'>
            <label for="author-img" className="text-sm text-gray-700 block mb-1 font-medium">Author Image</label>
            <input type="file"  onChange={handleFileInputChang}
             name='photo' accept='.jpg, .png'  id="author-img" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-auto" placeholder="Choose Image" />
          </div>
       <div className="max-w-sm rounded overflow-hidden shadow-lg"><br/>
       <img className="w-full" src={`${fileUrl===""?updateData?.profilePicture?.url:fileUrl}`} alt="Product_thumnail" />
    </div><br/>
  <form className="w-full max-w-lg">
  <div className="flex flex-wrap -mx-3 mb-6">
  <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="first-name">
       First Name
      </label>
      <input name='first_name' value={updateData?.first_name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleInputChange} id="first-name" type="text" placeholder="Enter First Name" />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input name='last_name' value={updateData?.last_name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleInputChange} id="grid-last-name" type="text" placeholder="Enter Last Name" />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
       Email
      </label>
      <input name='email' value={updateData?.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleInputChange} id="grid-password" type="email" placeholder="Enter Email" />
    </div>
  </div>
  {/* <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input name='password' value={updateData?.password} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleInputChange} id="grid-password" type="password" placeholder="******************" />
    </div>
  </div> */}
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
       Mobile
      </label>
      <input name='mobile' value={updateData?.mobile} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={handleInputChange} id="grid-city" type="number" placeholder="Phone" />
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="profile">
       Profile
      </label>
      <div className="profile">
      <select onChange={handleInputChange} name='profile' value={updateData?.profile} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="profile">
        {profileList.map((item)=>{
        return(<><option key={item.id} onChange={handleInputChange} >{item.value}</option></>)
      })}
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
      <select onChange={handleInputChange} name='role' value={updateData?.role} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="role">
        {roleList.map((item)=>{
        return(<><option key={item.id} onChange={handleInputChange} >{item.value}</option></>)
      })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    
  </div>
  <p className="text-red-500 text-xs italic">Please fill out this field.</p>
  {fileErr&&<span className='text-red-500'>{fileErr}</span>}
  {inputErr&&<span className='text-red-500'>{inputErr}</span>}
  <div className="flex items-center justify-between mt-5">
      <button className="bg-teal-500 hover:bg-teal-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={updateAuthor} type="button">
      Submit
      </button>
    </div>
</form>

 </View>
  </>
  )
}

export default EditAuthor;