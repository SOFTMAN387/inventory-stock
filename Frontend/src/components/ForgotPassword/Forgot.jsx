import React from 'react'
import "./forgot.css";
const Forgot = () => {
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
                    type="text"
                    name="email"

                    required
                    autocomplete="off"
                    className='forgot-input'
                    // onChange={(e) => setInputEmail(e.target.value)}
                    placeholder='Email-Id'
                  />
                  <div className="btn-warpper">
                    {/* <button className='change-pass-btn' onClick={GenerateOtp}>Send OTP</button> */}
                    <button className='change-pass-btn'>Send OTP</button>
                    {/* {emailError && <h5 className='text-danger mt-2'>Invalid user email..!! </h5>} */}
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
            //   onChange={(e) => setInputOtp(e.target.value)}
              placeholder='OTP-Code'
            />
            <div className="btn-warpper">
              {/* <button className='change-pass-btn' onClick={VerifyOtp} >Verify OTP</button> */}
              <button className='change-pass-btn'  >Verify OTP</button>
              {/* {otpError && <h5 className='text-danger mt-2'>Invalid OTP ..!! </h5>} */}
            </div>
          </div>
        </div>
      </div></>
  )
}

export default Forgot