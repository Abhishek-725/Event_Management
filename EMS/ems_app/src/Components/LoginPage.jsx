import React from "react";
import { Link , useNavigate } from "react-router-dom";
import { FaUser , FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import "../Css/LoginPage.css";
import { useForm } from "react-hook-form";

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="userLogin1MainBody">
        <span id="eventloginformText">EVENT &nbsp; LOGIN &nbsp; FORM</span>
        <div className="test">
        <div className="loginContainer">
          {/* heading of login form in text */}
          <span id="loginformText">LOGIN &nbsp; FORM</span>
          {/* *********   Form Tag     ********  */}
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
              navigate("/RegisterPage");
            })}
          >
            {/* UserName InputBox */}
            <span className="usernameText">
              <FaUser />
              &nbsp;USERNAME:
            </span>
            <input
              type="email"
              placeholder="E-Mail..."
              id="loginUsernameInput"
              {...register("e_mail", 
                { 
                  required: {value :true , message:"Email is Required!" },
                  pattern : {value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                             message : "Invald E-Mail!" 
                            }
                })
              }
            >
            </input>
            {errors.e_mail && (
              <span className="errorMsg">*{errors.e_mail.message}</span>
            )}

            <hr id="Hr"></hr>
            {/* Password InputBox */}
            <span className="usernameText">
              <RiLockPasswordLine />
              &nbsp;PASSWORD:
            </span>
            <input
              type="password"
              placeholder="Password..."
              id="loginPasswordInput"
              {...register("password", 
                { required: {value : true , message : "Password is Required!" }
                })}
            ></input>
            {errors.password && (
              <span className="errorMsg">*{errors.password.message}</span>
            )}

            <hr id="Hr"></hr>
            {/* Remember Me and Forget Password */}
            <div className="RememberAndForget">
              <span id="RememberMe">
                <input type="checkBox" />
                Remember Me ?
              </span>
              <Link to="/">
                <span id="forgetPassword">Forget Password?</span>
              </Link>
            </div>
            {/* Submit Button */}
            <input type="submit" value="SUBMIT" id="submitBtn" />
          </form>
          <div className="loginOption">
              <span id="loginWith">Or Login With </span>
                <Link>
                <div id="google"><FcGoogle id="googleIcon"/>
                </div>
                </Link>
                <Link>
                <div id="facebook"><FaFacebookF id="facebookIcon" />
                </div>
                </Link>
          </div>
          <div><span id="createAccountLP">Create A  
            <Link to="/RegisterPage" id="accountLink"> Account?</Link></span>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
