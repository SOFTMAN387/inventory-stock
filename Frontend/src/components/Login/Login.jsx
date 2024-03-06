import React from 'react'
import "./login.css";
import { View } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
   <>
    <View
        backgroundColor="var(--amplify-colors-white)"
        borderRadius="6px"
        maxWidth="100%"
        padding="1rem"
        minHeight="80vh"
        className='login-div'
       
      >
   
     <div className="w-full max-w-sm">
      
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h3 className='text-xl font-bold'>Login to Dashboard</h3>
    <br/>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="Email">
      Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
      <p className="text-red-500 text-xs italic">Something went wrong !</p>
    </div>
    <div className="flex items-center justify-between ">
      <button className="bg-blue-500 hover:bg-blue-700 w-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/admin/forgot-password">
        Forgot Password?
      </Link>
    </div>
  </form>
</div>
   </View>
   
  
   </>
  )
}

export default Login;