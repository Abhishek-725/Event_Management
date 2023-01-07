import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../Stylecss/PassWord.css'
import { AiOutlineEye ,AiFillEyeInvisible } from "react-icons/ai";
import {BiCheck } from 'react-icons/bi';
import {RxCrossCircled} from 'react-icons/rx'

function PasswordToggle() {
   const {
      register,
      handleSubmit,
      formState:{errors}
      
  } = useForm();

    const [visible , setVisible] = useState(<AiFillEyeInvisible/>);
    const [type , setType] = useState("password");
    const handlePassword = ()=>{
      if(type === "password"){
         setVisible(<AiOutlineEye/>);
         setType("text");
      }else{
         setVisible(<AiFillEyeInvisible/>);
         setType("password");
      }
    }
     
 return ( 
    <>
      <form onSubmit={handleSubmit((data)=>console.log(data))}>
         <div>
            <input type={type} placeholder="Enter password..."
               {...register("password",
                     {
                           required :{value : true , message:"Password is  Required!"},
                           minLength : {value : 8 , message : "Maximum Length is 8 character!"},
                           pattern : {value : /[!@#$%^&*]/ , 
                           message : "Must Contain Special Character like [!@#$] ect."}
                          
                        
                     }
                  )
               }
            />
         <span onClick={handlePassword}>{visible}</span>
         {errors.password && <span>*{errors.password.message}</span>}<br/>

         <div>
            <p id='VPassCross'>
               <RxCrossCircled id='crossIcon8'/><BiCheck id='checkIcon'/>Max Length should Be 8.
            </p>
            <p id='VPassCross'>
            <RxCrossCircled id='crossIconCOM'/><BiCheck id='checkIcon'/>combination of Alphabet and number.
            </p>
            <p id='VPassCross'>
               <RxCrossCircled id='crossIcon'/><BiCheck id='checkIcon'/>Must Contain one Uppercase Alphabet.
            </p>
            <p id='VPassCross'>
               <RxCrossCircled id='crossIcon'/><BiCheck id='checkIcon'/>Special character.
            </p>
         </div>

         <input type="submit" value="SUBMIT"  />
         </div>
      </form>
    </>
 );
}

export default PasswordToggle;