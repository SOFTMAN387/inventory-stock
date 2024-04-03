import React,{useState} from 'react';
import axios from "axios";
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { View } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { actions } from '../../redux/reducers/inventoryReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
const Login = () => {
 const navigate=useNavigate();
 const dispatch=useDispatch();
  const [err,setErr]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");  
  const handleLogin = async () => {
    try {
      
    const res = await axios.post(`${BASE_URL}/api/user/login`,
    
     {
      email,
      password,
      role
    });
    if (res?.data) {
      // Cookies.set("user", res.data.token, { expires: 7 });
      dispatch(actions.loginUser([res.data]));
      toast(res.data.msg);
      navigate("/");
    }else{
      setErr("Wrong email or password");
    }
      
    } catch (error) {
      setErr("Something Went Wrong...");
    }
  };

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
       <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
        />
   
     <div className="w-full max-w-sm">
      
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h3 className='text-xl font-bold'>Login to Dashboard</h3>
    <br/><b>Note:</b> for testing you can use UserName: <b>"test@gmail.com" </b>& Password: <b>"test@123"</b>.
    <br/><br/>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="Email">
      Email
      </label>
      <input  onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
      <br/>
     
    </div>
    <select onChange={(e) => setRole(e.target.value)} name="role" className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block  focus:border-blue-500 text-gray-700 w-auto">
    <option value="Super-Admin">Login as Super Admin</option>
    <option value="Admin">Login as Admin</option>

    </select><br/>
    {err && <span className="text-red-500 text-sm ml-10">{err}</span>}<br/><br/>
    <div className="flex items-center justify-between ">
      <button   onClick={handleLogin } className="bg-teal-700 hover:bg-teal-900 w-auto text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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