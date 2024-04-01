import React,{useState} from 'react';
import { BASE_URL } from '../../config';
import emailjs from "@emailjs/browser";
import { useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import "./forgot.css";
import { actions } from '../../redux/reducers/inventoryReducer';
const Forgot = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [inputEmail, setInputEmail] = useState(null);
  const [inputOtp, setInputOtp] = useState(null);
  const [forgotUser, setForgotUser] = useState(null);
  const [genOtp, setGenOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");



  const GenerateOtp = async (e) => {
    e.preventDefault();
    try {
    
      const verifyEmail = await axios.post(`${BASE_URL}/api/user/verify-email`,{
        "email":inputEmail
      });
      if (verifyEmail.status ===200) {
        var range = "0123456789";
          var otpVal = "";
          for (var i = 0; i < 6; i++) {
            otpVal += range[Math.floor(Math.random() * 10)]
          }
          setGenOtp(otpVal);
            var templateParams = {
              email: `${inputEmail}`,
              email_otp: `${otpVal}`
            };

        emailjs.send("service_4f0nila", "template_yu5e6g2", templateParams, "YNBCfU8sZwJ4SvtqD")
          .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
          }, function (error) {
            console.log('FAILED...', error);
          });
         
        alert("OTP sent to your registered Email Id...");
        setForgotUser([verifyEmail?.data?.chekEmail]);
        setEmailError(false);

      } else {
        setEmailError(true);
        navigate("/forgot-password");
      }


    } catch (error) {
      setEmailError(error.message);
    }
  }

console.log(forgotUser);
  const VerifyOtp = (e) => {
    e.preventDefault();
    try {

      if (inputOtp) {
        if (inputOtp === genOtp) {

          setOtpError(false);
          dispatch(actions.forgotPassword(forgotUser));
          navigate("/new-password");
        } else {
          setOtpError(true);
        }

      } else {
        setOtpError(true);
      }
    } catch (error) {
      setOtpError(error.message);
    }
  }



  return (
   <>
      <div className='pass-main-div'>
        <div className="container-password">

          <div className="pic-wrapper">
            <img src="https://i.postimg.cc/9QpzGZk3/vector.png" className='forgot-img' alt="ntcs-forgot-img" />
          </div>

          <div className="form-wrapper">
            <form className='forgot-form' action="#" method="get">
              <div className="input-container">
                <div className="inp-wrapper">
                  <label className='forgot-label' for="email-id">Enter Email </label>
                  <input
                    type="email"
                    name="email"

                    required
                    autocomplete="off"
                    className='forgot-input'
                     onChange={(e) => setInputEmail(e.target.value)}
                    placeholder='Email-Id'
                  />
                  <div className="btn-warpper">
                    <button className='change-pass-btn' onClick={GenerateOtp}>Send OTP</button>
                    {/* <button className='change-pass-btn'>Send OTP</button> */}
                    {emailError && <h5 className='text-red-700 mt-2'>Invalid user email..!! </h5>}
                  </div>
                  <br />

                </div>

              </div>

            </form>
            <label className='forgot-label' for="email-id">Enter 6 digits OTP Code </label>
            <input
              type="text"
              name="otp-code"

              required
              autocomplete="off"
              className='forgot-input ml-3'
               onChange={(e) => setInputOtp(e.target.value)}
              placeholder='OTP-Code'
            />
            <div className="btn-warpper">
              <button className='change-pass-btn' onClick={VerifyOtp} >Verify OTP</button>
              {/* <button className='change-pass-btn'  >Verify OTP</button> */}
              {otpError && <h5 className='text-red-700 mt-2'>Invalid OTP ..!! </h5>}
            </div>
          </div>
        </div>
      </div></>
  )
}

export default Forgot