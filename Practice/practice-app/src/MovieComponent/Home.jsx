import {useState} from 'react';
import React, * as react from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import '../MovieComponent/home.css'
import PasswordToggle from './PasswordToggle';


function Home() {
    //const [moviesName , setData] = useState(["Kantara","Ramayana","Rocketry", "Dangal"]); 
    const moviesname = ["Kantara","Ramayana","Rocketry", "Dangal","Raaz 3"];
    // function displayMovie(){      
    // setData(moviesName.map(moviename => { <li key={moviename}> {moviename} </li>  }))
    // }
    let [count_ , setcount_] = useState(5) ;
    const {
        register,
        handleSubmit,
        formState:{errors}
        
    } = useForm();

    const registerOptions = {
    
    }
        
    
    

    
    
    return ( 
        <>
            <h2>Welcome To Movie World !</h2>
            <p>This are list of our movie :</p>
            <ol>
                {moviesname.map(name => <li key={name}>{name}</li>)}
            </ol>
            <ul>
                {display(moviesname)} 
            </ul>

            <h2>{count_}</h2>
            <button onClick={()=>{setcount_(count_+1)}}>Click</button>

            <form onSubmit={handleSubmit((data)=>console.log(data))} >
                <input type="text" placeholder='Enter name...' 
                {...register("name",
                {required : {
                        value: true,
                        message:"Name is Required!"},
                    pattern : {
                        value : /^[A-Za-z]+[A-Za-z]$/,
                        message : "Invalid name!"
                    },    
                    maxlength :{
                        value : 5,
                        message : "Please Valid Name!"
                    }
               } )}>

                </input> 
                {errors.name && <span className='errorMsg'>* {errors.name.message} </span>} 
                <br/> <br/>

                <input type="email" placeholder='Enter e-mail...'
                {...register("email",{required:{value:true,message:"E-mail is Required!"},
                pattern:{
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address!"
                    }
                
                })}>
                </input>
                {errors.email && <span className='errorMsg'>*{errors.email.message}</span>}
                <br/> <br/>       
                {/* <PasswordToggle /> */}

                <button>SUBMIT</button>
            </form>
            
        </>
     );

}
function display(moviearr) {
    const result = moviearr.map((name , index) => <li key={index}>{name}</li>);   
    return  result; 
  }

export default Home;