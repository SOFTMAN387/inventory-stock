import React from 'react'

const NewPassword = () => {
  return (
   <>
     <div className='pass-main-div'>
                <div className="container-password">
                    <div className="form-wrapper">
                        <form className='forgot-form' >
                            <div className="input-container">
                                <div className="inp-wrapper">
                                    <label className='forgot-label' for="email-id">New Password </label>
                                    <input
                                        type="password"
                                        name="new-password"

                                        required
                                        autocomplete="off"
                                        className='forgot-input'
                                        // onChange={(e) => setNewPass(e.target.value)}
                                        placeholder='Enter New Password'
                                    />
                                    <br />
                                    <label className='forgot-label' for="email-id">Confirm Password </label>
                                    <input
                                        type="password"
                                        name="password"

                                        required
                                        autocomplete="off"
                                        className='forgot-input'
                                        // onChange={(e) => setConfirmPass(e.target.value)}
                                        placeholder='Enter Confirm Password'
                                    />
                                    {/* {passErr && <h5 className='text-danger mt-2'>confirm password doesn't match.. </h5>} */}
                                    {<h5 className='text-danger mt-2'>confirm password doesn't match.. </h5>}
                                    <div className="btn-warpper">
                                        {/* <button className='change-pass-btn' onClick={handleClick} >Update Password</button> */}
                                        <button className='change-pass-btn' >Update Password</button>
                                        {/* {err && <h5 className='text-danger mt-2'>{err}</h5>} */}
                                    </div>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
   </>
  )
}

export default NewPassword