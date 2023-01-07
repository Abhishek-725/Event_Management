import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import sty from "../Css/RegisterPage.module.css"

import {AiFillEyeInvisible , AiFillEye} from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri";
import {BsFillTelephoneFill} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF} from "react-icons/fa";

function RegisterPage() {
  const  navigate = useNavigate();
    // Form 
    const {
      register,
      handleSubmit,
      formState : {errors},
      trigger
    } = useForm();
    // EyeIcon 
    const [eyeIconVisible , seteyeIcon] = useState(<AiFillEyeInvisible/>);
    const [type , setTypeInput] = useState("password");
    const handleTogglePassword = ()=>{
          if(type === "password"){
            seteyeIcon(<AiFillEye/>);
            setTypeInput("text");
          }else{
            seteyeIcon(<AiFillEyeInvisible/>);
            setTypeInput("password");
          }
      }
  return (
 <>
    <div className={sty.mainBody}>
        <span className={sty.RoyalEventText}>
          ROYAL &nbsp; EVENT &nbsp; MANAGEMENT
        </span>
        <div className={sty.mainBodyContainer}>

        <form onSubmit={handleSubmit((data)=>console.log(data))}>
          <span className={sty.RegisterText}>
            Register &nbsp;Form
          </span>

          {/* Display Error Message of name Field */}
          <div className={sty.err}>
                <div className={sty.errorMsg}>
                {errors.firstName && 
                  <div >
                    <span >*{errors.firstName.message}</span>
                  </div>
                }
                </div>
                {errors.lastName && 
                 <div className={sty.errorMsglastName}>
                    <span>*{errors.lastName.message}</span>
                  </div>
                } 
          </div>
          <div className={sty.RegName}>
            <span className={sty.firstNameIcon}><BiUserCircle/></span>
            <input type="text" placeholder="First Name..." 
              {...register("firstName",
              {required:{value : true , message : "First-Name is Required!"},
              pattern:{value : /^[A-Za-z]+[A-Za-z]$/, message : "Invalid First-Name!"}
              }
              )}
            />
            
            <span className={sty.lastNameIcon}><BiUserCircle/></span>
            {/* <span className={sty.nameText}>Name :&nbsp;</span> */}
            <input type="text" placeholder="Last Name..." 
              {...register("lastName",
              {required:{value : true , message : "Last-Name is Required!"},
              pattern:{value : /^[A-Za-z]+[A-Za-z]$/, message : "Invalid Last-Name!"}
              }
              )}
            />
            
            
            
          </div>
          
          {/* E-mail Start */}
          {errors.email && 
              <div >
                <span className={sty.errorMsg}>*{errors.email.message}</span>
              </div>
          }
          <div className={sty.RegEmail}>
            <span><HiOutlineMail/></span>
            {/* <span className={sty.emailText}> E-mail &nbsp; </span> */}
            <input type="email" placeholder='Enter the E-mail..'  
              {...register("email",
              {required:{value : true , message : "E-Mail is Required!"},
              pattern:{value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message : "Invalid E-Mail Please Check!"}
              }
              )}
            />
          </div>
          {/* /^[A-Za-z]+[0-9]+@[A-Za-z]{2:}+\.[A-Za-z]{2:}$/i */}
                {/* *********   Password Start      ******* */}
          {errors.password && 
            <div >
              <span className={sty.errorMsg}>*{errors.password.message}</span>
            </div>
          }      
          <div className={sty.RegPassword}>
            <span><RiLockPasswordLine/></span>
            <input type={type} placeholder='Enter the password..'  
               {...register("password",
                {
                  required:{value : true , message : "Password is Required!"},
                }
              )}
            />
             <i className={sty.eyeIcon} onClick={handleTogglePassword}>{eyeIconVisible}</i>
          </div>
          {/* {errors.confirmPassword && 
            <div >
              <span className={sty.errorMsg}>*{errors.confirmPassword.message}</span>
            </div>
          }
          <div className={sty.RegPassword}>
            <span><RiLockPasswordLine/></span>
            <input type="password" placeholder='Confirm password..' 
              {...register("confirmPassword",
                {
                  required:{value : true , message : "Password is Required!"},
                }
              )}
            />
          </div> */}

          {/*    *********  Contact Start    ***********  */}
                {errors.contact && 
                    <div >
                      <span className={sty.errorMsg}>*{errors.contact.message}</span>
                    </div>
                }
          <div className={sty.RegPassword}>
            <span><BsFillTelephoneFill/></span>
            <input type="text" placeholder='Contact No. ..'  
              {...register("contact",
              {required:{value : true , message : "Phone number is Required!"},
              pattern:{value : /^\d{10}$/, message : "Invalid Phone Number!"}
              }
              )}
            />
          </div>

          <div>
            <input type="submit" value="SUBMIT" className={sty.submitBtn}  />
          </div>
          {/* *******   Sign in Option  ******* */}
          {/* <div>
            
          </div> */}
          <div className={sty.loginOption}>
          <span className={sty.signOpt}>Or Sign In With </span>
                <Link>
                <div className={sty.googleIcon}><FcGoogle />
                </div>
                </Link>
                <Link>
                <div className={sty.facebookIcon}><FaFacebookF/>
                </div>
                </Link>
          </div>
          {/* ******** Already User Text  ****** */}
          <div>
            <span className={sty.alreadyUser}>Already A User ? 
              <Link to="/LoginPage">
                <span className={sty.login}>Login</span>
              </Link> 
            </span>
          </div>
        </form>

        

        </div>
  
      </div>
 </>
  );
}

export default RegisterPage;
// className={sty.userIcon}