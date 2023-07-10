import React from 'react';
import { useForm  } from 'react-hook-form';
import { useState , useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import TitleBar from '../SubComponents/TitleBar';
import style from '../../AdminCss/Venue.module.css';

function AddVenue() {
    
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
    <div>
        <TitleBar/>
    <div>
            {/* <div className={style.addEventText}>ADD EVENT</div> */}
    <div className={style.mainContainer}>
        <div className={style.container}>
            <div className={style.addEventText}>ADD VENUE</div>
                <form onSubmit={handleSubmit((data)=>{
                    console.log("Data : ",data);
                    let {venueName , venuePrice , venueAddress} = data;
                    // Send data to Server
                    axios
                        .post("http://localhost:3001/venue/InsertVenue", 
                        {
                            title:venueName,
                            cost:venuePrice,
                            address:venueAddress,
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
                        {errors.venueName && <span>*{errors.venueName.message}</span>}
                    </div>
                        <label>Venue Name :</label>
                        <input style={{"marginLeft":"21px"}}
                        type="text" placeholder="Enter Venue Name..." className={style.input}
                            {...register("venueName",{
                                required:{
                                    value:true,
                                    message:"Venue Name is Required!"
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
                        {errors.venuePrice && <span>*{errors.venuePrice.message}</span>}
                    </div>
                        <label>Venue Price :</label>
                        <input style={{"marginLeft":"25px"}}
                        type="text" placeholder="Enter Venue Price..." className={style.input}
                            {...register("venuePrice",{
                                required:{
                                    value:true,
                                    message:"Venue Price is Required!"
                                },     
                                pattern: {
                                    value: /^[1-9]+[0-9]/i,
                                    message: "Only Numbers Allowed!",
                                },
                                maxLength:{
                                    value:6,
                                    message:"Minimum 6 Digit Can be Enter!"
                                },
                                min:{
                                    value:20000,
                                    message:"Minimum amount is 20,000!"
                                }
                            })
                            }
                        />
                    </div>
                    {/* Venue Address */}
                    {/* type="textArea" */}
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.venueAddress && <span>*{errors.venueAddress.message}</span>}
                    </div>
                        <label className={style.labTxtArea}>Venue Address :</label>
                        <textarea 
                        className={style.TxtArea}
                         placeholder="Enter Venue Address..." 
                            {...register("venueAddress",{
                                required:{
                                    value:true,
                                    message:"Venue Address is Required!"
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
                        <label>Select Venue Image :</label>
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
    </div>
</div>
    </> );
}

export default AddVenue;