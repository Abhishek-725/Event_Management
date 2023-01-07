import React from "react";
import { useForm  } from 'react-hook-form';
import axios from 'axios';
import '../Stylecss/PassWord.css'
import { useNavigate } from "react-router-dom";


function User() {
    const {
        register,
        handleSubmit,
        formState:{errors}
        
    } = useForm();
    

    async function send(name , email){
      const res = await fetch("http://localhost:3001/Home" , {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify({name , email }),
        mode : "cors"
      })
      const d1 = await res.json();
      console.log(d1);
     
    }

  return (
    <>
      <div id="bk">
        <form onSubmit={handleSubmit((data) => {console.log(data);
        let {name , email , password} = data;
        console.log("Name is : "+name);
        console.log("Email is : "+email);
        // ,JSON.stringify({name,email})
        axios.post('http://localhost:3001/Home',{name , email ,password})
        .then((res)=>{console.log(res)}).catch((err)=>{console.log("Error is",err)});
          //  send(name,email);
          // navigate('/');
        })}>
          <input
            type="text"
            placeholder="Enter name..."
            {...register("name", {
              required: {
                value: true,
                message: "Name is Required!",
              },
              pattern: {
                value: /^[A-Za-z]+[A-Za-z]$/,
                message: "Invalid name!",
              },
              maxlength: {
                value: 5,
                message: "Please Valid Name!",
              },
            })}
          ></input>
          {errors.name && (
            <span className="errorMsg">* {errors.name.message} </span>
          )}
          <br /> <br />
          <input
            type="email"
            placeholder="Enter e-mail..."
            {...register("email", {
              required: { value: true, message: "E-mail is Required!" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address!",
              },
            })}
          ></input>
          {errors.email && (
            <span className="errorMsg">*{errors.email.message}</span>
          )}
          <br /> <br />
          {/* <PasswordToggle /> */}
          <input type="password" placeholder="Enter the password..."
          {...register("password",{
            required : {value : true,message:"Paasword is required!"},

          })}
          />
          {errors.password && (
            <span className="errorMsg">*{errors.password.message}</span>
          )}<br/>
          <button>SUBMIT</button>
        </form>
      </div>
    </>
  );
}

export default User;
