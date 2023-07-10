import React, { useState } from 'react';
import style from '../Css/ForgetPassword.module.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import {BsShieldLock , BsShieldLockFill} from 'react-icons/bs';
import {FaUserAlt} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [otpSection , setOtpSection] = useState(false);
    const navigate = useNavigate();
    // Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm();
return ( <>
    <div className={style.mainBody}>
        <div className={style.container}>
            <div className={style.lockLogo}>
                <BsShieldLockFill 
                style={{"color":"white","marginLeft":"22%","marginTop":"22%","fontSize":"20px"}}/>
            </div>
            {/* Forget Text */}
            <div>
                <span className={style.forgetTxt}>Forget Password</span>
                {!otpSection &&
                    <span className={style.note}>We Just Need Your E-Mail Address To Verify You!</span>}
                {otpSection && <span className={style.noteOtp}>Please Enter The Otp!</span> }
            </div>

{ !otpSection    &&        <div style={{"marginTop":"22px"}}>
                <form onSubmit={handleSubmit((data) => {
                console.log(data);
                const {email } = data;
              //sending to server
              axios
                .post("http://localhost:3001/forgetPassword/mailOtp", {
                  email
                })
                .then((res) => {
                  if(res.data.Message === "Success"){
                  console.log(res.data.Message);
                  Swal.fire({
                    position: 'top',
                    icon: 'info',
                    title: 'Please Enter The OTP Send On Your Mail!',
                    showConfirmButton: true,
                  }).then((result) =>{
                    if (result.isConfirmed) {
                      // navigate("/LoginPage");
                      setOtpSection(!otpSection);
                      
                    }})
                  }else{
                    Swal.fire({
                    position: 'top',
                    icon: 'info',
                    title: 'Network Error!',
                    text: res.data.Message,
                    showConfirmButton: true,
                  })

                  }

                })
                .catch((err) => {
                  console.log("Error is", err);
                    Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
                });
                })}>
                    {/* E-mail */}
                    {errors.email && (
                                <div>
                                    <span className={style.errorMsg}>*{errors.email.message}</span>
                                </div>
                                )}
                <span className={style.userLogo}><FaUserAlt/></span>
                <input className={style.input}
                type="text" placeholder='Please Enter Your E-Mail...'
                    {...register("email",{
                  required: { value: true, message: "E-Mail is Required!" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid E-Mail Please Check!",
                  },
                })}
                />

            <div>
              <input type="submit" value="SUBMIT" className={style.submitBtn} />
            </div>
                
                <div>
                    <span className={style.accountTxt}>Don't Have an Account ?</span>
                    <Link to='/RegisterPage'>
                        <span className={style.regTxt}>Register</span>
                    </Link>
                </div>
            </form>
            </div>}

{/*************************       *Otp section*          ***********************/}
            {otpSection && 
            <div>
                <div>
                    <form onSubmit={handleSubmit((data) => {
                      console.log(data)
                      let {email,num1 , num2 , num3 , num4} = data;
                      let userOtp = Number(""+num1+num2+num3+num4);
                      console.log(userOtp);
                      axios
                          .post("http://localhost:3001/forgetPassword/verifyOtp", {
                            userOtp
                          })
                          .then((res) => {
                            if(res.data.Message === "Valid OTP"){
                            console.log(res.data.Message);
                            Swal.fire({
                              position: 'top',
                              icon: 'success',
                              title: 'User Verified!',
                              showConfirmButton: true,
                            }).then((result) =>{
                              if (result.isConfirmed) {
                                navigate("/PasswordChanged",{state:{email:email}});
                                
                              }})
                            }else{
                              Swal.fire({
                              position: 'top',
                              icon: 'info',
                              title: res.data.Message,
                              text: 'Please Try Again Or Click On Resend!',
                              showConfirmButton: true,
                            })

                            }

                          })
                          .catch((err) => {
                            console.log("Error is", err);
                              Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: err.message,
                              footer: '<a href="">Why do I have this issue?</a>'
                            })
                          });
                    })}>
                        <div className={style.otpSection}>
                            <input 
                            type='text' className={style.inputOtp}
                            maxLength  = '1'
                            {...register("num1")}
                            />
                            <input 
                            type='text' className={style.inputOtp}
                            maxLength  = '1'
                            {...register("num2")}
                            />
                            <input 
                            type='text' className={style.inputOtp}
                            maxLength  = '1'
                            {...register("num3")}
                            />
                            <input 
                            type='text' className={style.inputOtp}
                            maxLength  = '1'
                            {...register("num4")}
                            />

                        </div>
                        <div>
                            <input type="submit" value="VERIFY" className={style.submitBtn} />
                        </div>
                        <div className={style.otpResend}>OTP Not Receive? 
                          <span className={style.resendTxt}
                                onClick={()=>alert("click")}
                          >RESEND</span>
                        </div>
                    </form>
                </div>
            </div> }

        </div>
    </div>
</> );
}

export default ForgetPassword;