import React from 'react';
import TitleBar from '../SubComponents/TitleBar';
import { useForm  } from 'react-hook-form';
import { useState , useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import style from '../../AdminCss/Maincourse.module.css';

function AddMainCourse() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const config = {
        headers : {'content-type' : 'multipart/form-data'},
    };
return ( <>
    <TitleBar/>
    <div className={style.mainContainer}>
        <div className={style.container}>
            <div className={style.addEventText}>ADD DISH</div>
                <form onSubmit={handleSubmit((data)=>{
                    console.log("Data : ",data);
                    let {dishName , dishType , dishPrice , description} = data;
                    // Send data to Server
                    axios
                        .post("http://localhost:3001/maincourse/InsertManicourse", 
                        {
                            dishName,
                            dishType,
                            dishPrice,
                            description,
                            image:file
                            
                        },config)
                        .then((res) => {
                            console.log(res.data);
                            if(res.data === "Data Save"){
                                Swal.fire({
                                            position: 'top',
                                            icon: 'success',
                                            title: 'Data Save Successfully!',
                                            showConfirmButton: true,
                                        })

                            }else{
                                Swal.fire({
                                            position: 'top',
                                            icon: 'info',
                                            title: 'Fail to Save!',
                                            text: `${res.data}`,
                                            showConfirmButton: true,
                                        })
                            }
                            // alert("Login Successful!");
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
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.dishName && <span>*{errors.dishName.message}</span>}
                    </div>
                        <label>Dish Name :</label>
                        <input style={{"marginLeft":"45px"}}
                        type="text" placeholder="Enter Dish Name..." className={style.input}
                            {...register("dishName",{
                                required:{
                                    value:true,
                                    message:"Dish Name is Required!"
                                },     
                                pattern: {
                                    value: /^([\w]{3,})+\s+([\w\s]{3,})+$|^[A-Za-z]+[A-Za-z]$/i,
                                    message: "Invalid Name!",
                                }
                            })
                            }
                        />
                    </div>
                    {/* Dish Type */}
                    <div className={style.eventName}>
                        <div className={style.errorMsg}>
                            {errors.dishType && <span>*{errors.dishType.message}</span>}
                        </div>
                        <label>Dish Type :</label>
                        <select title='Select Dish Type'
                            style={{"marginLeft":"50px"}} className={style.select}
                                {...register("dishType",{
                                    required:{
                                        value:true,
                                        message:"Dish Type is Required!"
                                    }
                                })
                                }
                            >
                                <option value='' style={{"color":"rgb(140, 135, 135)"}}>
                                    Select Dish Type...
                                </option>
                                <option value='VEG'>VEG</option>
                                <option value='NON-VEG'>NON-VEG</option>
                        </select>
                    </div>



                    {/* Venue Price */}
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.dishPrice && <span>*{errors.dishPrice.message}</span>}
                    </div>
                        <label>Dish Price :</label>
                        <input style={{"marginLeft":"50px"}}
                        type="text" placeholder="Enter Venue Price..." className={style.input}
                            {...register("dishPrice",{
                                required:{
                                    value:true,
                                    message:"Dish Price is Required!"
                                },     
                                pattern: {
                                    value: /^[1-9]+[0-9]/i,
                                    message: "Only Numbers Allowed!",
                                },
                                maxLength:{
                                    value:5,
                                    message:"Minimum 6 Digit Can be Enter!"
                                },
                                min:{
                                    value:80,
                                    message:"Minimum amount is 80!"
                                }
                            })
                            }
                        />
                    </div>
                    {/* Dish Descpt */}
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.description && <span>*{errors.description.message}</span>}
                    </div>
                        <label className={style.labTxtArea}>Dish Description :</label>
                        <textarea 
                        className={style.TxtArea}
                         placeholder="Enter Description..." 
                            {...register("description",{
                                required:{
                                    value:true,
                                    message:"Description is Required!"
                                },     
                                pattern: {
                                    value: /^([\w]{3,})+\s+([\w\s]{3,})+$|^[A-Za-z]+[A-Za-z]$/i,
                                    message: "Invalid Name!",
                                }
                            })
                            }
                        />
                    </div>

                    {/*    /^[A-Za-z]+[A-Za-z]$/ */}
                    <div className={style.eventImage}>
                        <div className={style.errorMsg}>
                            {errors.image && <span>*{errors.image.message}</span>}
                        </div>
                        <div className={style.img}>
                        <label>Select Dish Image :</label>
                            <input
                            type="file" className={style.inputfile} 
                                {...register("image",{
                                required:{
                                    value:true,
                                    message:"Image is Required!"
                                },
                                onChange:(e) =>{
                                    if(e.target.files){                   
                                    setFile(e.target.files[0]);
                                    setFileName(e.target.files[0].name);}
                                },
                                pattern:{
                                    value:/(\.jpg|\.jpeg|\.png|\.gif)$/i,
                                    message:"Please upload file having extensions .jpeg/.jpg/.png/.gif only.'"
                                }
                            })}
                            />
                        </div>
                    </div>
                    <input type="submit" value="ADD" className={style.submitBtn} />
                    <input type="reset" value="RESET" className={style.submitBtn} />
                </form>
            
        </div>

        <div>{file!==undefined && <div className={style.imgDivBox}>
            <p>Image Preview:</p>
                    <img src={URL.createObjectURL(file)} className={style.previewImg} alt="Image"/>
            </div>}
        </div>
    </div>
</> );
}

export default AddMainCourse;