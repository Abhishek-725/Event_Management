import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import {BsShieldLock , BsShieldLockFill} from 'react-icons/bs';
import {FaUserAlt} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri';
import {AiFillEyeInvisible , AiFillEye} from 'react-icons/ai'
import style from '../Css/PasswordChange.module.css';

function PasswordChanged() {
    const navigate = useNavigate();
    const location = useLocation();
    let {email} = location.state;
    console.log(email);
    const [passwordType,setPasswordType] = useState('password');
    const [eye,setEye] = useState(<AiFillEyeInvisible/>);
    const changePwd = () =>{
        if(passwordType === 'password'){
            setPasswordType('text');
            setEye(<AiFillEye/>);
        }
        else{
            setPasswordType('password');
            setEye(<AiFillEyeInvisible/>);
        }
    };
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
            <div>
                <span className={style.forgetTxt}>Forget Password</span>
                <span className={style.note}>Please Enter The New Password!</span>
            </div>

            <div style={{"marginTop":"22px"}}>
                <form onSubmit={handleSubmit((data) => {
                console.log(data);
                const {userPassword } = data;
              //sending to server
              axios
                .post("http://localhost:3001/forgetPassword/changePassword", {
                    email,
                    userPassword
                })
                .then((res) => {
                    console.log(res.data);
                  if(res.data.Message === "Passwoed Change"){
                  console.log(res.data.Message);
                  Swal.fire({
                    position: 'top',
                    icon: 'info',
                    title: 'Password Change Successfully!',
                    showConfirmButton: true,
                  }).then((result) =>{
                    if (result.isConfirmed) {
                      navigate("/LoginPage");
                      
                      
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
                    {errors.userPassword && (
                                <div>
                                    <span className={style.errorMsg}>*{errors.userPassword.message}</span>
                                </div>
                                )}
                <span className={style.userLogo}><RiLockPasswordFill/></span>
                <input className={style.input}
                type={passwordType} placeholder='Please Enter New Password...'
                    {...register("userPassword",{
                  required: { value: true, message: "New Password is Required!" },
                  minLength:{value:8,message:"Minimum 8 Character Required!"}
                })}
                />
                <i className={style.eyeIcon} onClick={changePwd}>
                    {eye}
                </i>
                    
                
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
            </div>

        </div>

    </div>
</> );
}

export default PasswordChanged;