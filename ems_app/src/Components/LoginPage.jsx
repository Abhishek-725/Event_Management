import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FaUser, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiLockPasswordLine } from "react-icons/ri";
import "../Css/LoginPage.css";

function LoginPage() {
  // Component did mount
  // Component
  const style = {
    border: "1px solid red",
  };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authUser = () => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: { access: "jwt" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.Message === "Valid User") {
          console.log(res.data.Admin);
          if (res.data.Admin) {
            localStorage.setItem("isAdmin",true);
            navigate("/AdminHomePage", {
              state: res.data.userData,
            });
          } else {
            console.log("run");
            localStorage.setItem("isAdmin",false);
            let userData = res.data.userData;
            navigate("/HomePage", {
              state: res.data.userData,
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    authUser();
    window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
        });
  }, []);
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
                let { e_mail, userpassword } = data;
                console.log("email", userpassword);
                axios
                  .post(
                    "http://localhost:3001/users/loginUser",
                    { e_mail, userpassword },
                    { withCredentials: true }
                  )
                  .then((result) => {
                    console.log(result.data);
                    if (result.data) {
                      if (result.data.Message === "Valid Password") {
                        Swal.fire({
                          position: "top",
                          icon: "success",
                          title: "Login Successfully!",
                          showConfirmButton: true,
                        }).then((btnresult) => {
                          if (btnresult.isConfirmed) {
                            if (result.data.Admin) {
                              localStorage.setItem("isAdmin",true);
                              navigate("/AdminHomePage", {
                                state: result.data.userData,
                              });
                            } else {
                              localStorage.setItem("isAdmin",false);
                              navigate("/HomePage", {
                                state: result.data.userData,
                              });
                            }
                            localStorage.setItem("isLogin",true);
                            console.log("localStorage run");
                          }
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: result.data.Message,
                        });
                      }
                    } else {  //if no user found
                      Swal.fire({
                        title: `<strong>No Such User Found!</strong>`,
                        icon: "info",
                        focusConfirm: false,
                      });
                    }
                  })
                  .catch((err) => {
                    console.log({ error: err });
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: err.message,
                      footer: '<a href="">Why do I have this issue?</a>',
                    });
                  });
                // navigate("/RegisterPage");
              })}
            >
              {/* UserName InputBox */}
              <span className="usernameText">
                <FaUser />
                &nbsp;USERNAME:
              </span>
              <input
                style={errors.e_mail && style}
                type="email"
                placeholder="E-Mail..."
                id="loginUsernameInput"
                {...register("e_mail", {
                  required: { value: true, message: "Email is Required!" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invald E-Mail!",
                  },
                })}
              ></input>
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
                style={errors.userpassword && style}
                type="password"
                placeholder="Password..."
                id="loginPasswordInput"
                {...register("userpassword", {
                  required: { value: true, message: "Password is Required!" },
                })}
              ></input>
              {errors.userpassword && (
                <span className="errorMsg">*{errors.userpassword.message}</span>
              )}

              <hr id="Hr"></hr>
              {/* Remember Me and Forget Password */}
              <div className="RememberAndForget">
                {/* <span id="RememberMe">
                <input type="checkBox" />
                Remember Me ?
              </span> */}
                <Link to="/ForgetPassword">
                  <span id="forgetPassword">Forget Password?</span>
                </Link>
              </div>
              {/* Submit Button */}
              <input type="submit" value="SUBMIT" id="submitBtn" />
            </form>
            {/* <div className="loginOption">
              {/* <span id="loginWith">Or Login With </span>
              <Link>
                <div id="google">
                  <FcGoogle id="googleIcon" />
                </div>
              </Link> */}
              {/* <Link>
                <div id="facebook"><FaFacebookF id="facebookIcon" />
                </div>
                </Link> */}
            {/* </div> */} 
            <div>
              <span id="createAccountLP">
                Create A
                <Link to="/RegisterPage" id="accountLink">
                  {" "}
                  Account?
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
