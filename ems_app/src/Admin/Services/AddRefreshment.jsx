import React from 'react';
import TitleBar from '../SubComponents/TitleBar';
import { useForm  } from 'react-hook-form';
import { useState , useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import style from '../../AdminCss/AddRefreshment.module.css';
import refreshMent from '../../Images/Admin_Image/refresh.jpg'

function AddRefreshment() {
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
return (<>
    <TitleBar/>
    <div className={style.mainContainer}>
        <div className={style.container}>
            <div className={style.addEventText}>ADD REFRESHMENT</div>
                <form onSubmit={handleSubmit((data)=>{
                    console.log("Data : ",data);
                    let {refreshMentName , refreshMentPrice , description} = data;
                    // Send data to Server
                    axios
                        .post("http://localhost:3001/refreshMent/insertRefreshMent", 
                        {
                            refreshMentName,
                            description,
                            refreshMentPrice,
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
                        {errors.refreshMentName && <span>*{errors.refreshMentName.message}</span>}
                    </div>
                        <label>RefreshMent Name :</label>
                        <input style={{"marginLeft":"35px"}}
                        type="text" placeholder="Enter RefreshMent Name..." className={style.input}
                            {...register("refreshMentName",{
                                required:{
                                    value:true,
                                    message:"RefreshMent Name is Required!"
                                },     
                                pattern: {
                                    value: /^([\w]{3,})+\s+([\w\s]{3,})+$|^[A-Za-z]+[A-Za-z]$/i,
                                    message: "Invalid Name!",
                                }
                            })
                            }
                        />
                    </div>

                    {/* Venue Price */}
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.refreshMentPrice && <span>*{errors.refreshMentPrice.message}</span>}
                    </div>
                        <label>RefreshMent Price :</label>
                        <input style={{"marginLeft":"40px"}}
                        type="text" placeholder="Enter RefreshMent Price..." className={style.input}
                            {...register("refreshMentPrice",{
                                required:{
                                    value:true,
                                    message:"RefreshMent Price is Required!"
                                },     
                                pattern: {
                                    value: /^[1-9]+[0-9]/i,
                                    message: "Only Numbers Allowed!",
                                },
                                maxLength:{
                                    value:3,
                                    message:"Minimum 3 Digit Can be Enter!"
                                },
                                min:{
                                    value:30,
                                    message:"Minimum amount is 30!"
                                }
                            })
                            }
                        />
                    </div>
                    {/* RefreshMent Description */}
                    
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.description && <span>*{errors.description.message}</span>}
                    </div>
                        <label className={style.labTxtArea}>RefrshMent Description :</label>
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
                        <label style={{"marginRight":"30px","marginLeft":"35px"}}>Select Image :</label>
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

export default AddRefreshment;