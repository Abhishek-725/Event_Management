import React from 'react';
import TitleBar from '../SubComponents/TitleBar';
import { useForm  } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useState , useEffect } from 'react';
import axios from "axios";
import style from '../../AdminCss/Decoration.module.css';

function AddDecoration() {
    const [file, setFile] = useState();
    const [eventData , setEventData] = useState([]);
    const [fileName, setFileName] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const config = {
        headers : {'content-type' : 'multipart/form-data'},
    };

    //Getting Event data from server
    const fetchEvents = ()=>{
        const res = axios.get("http://localhost:3001/event")
                .then((result) => {
                //console.log(result);
                setEventData(result.data.result);
                })
                .catch((err) => {
                console.log("Err :", err);
                });
        }
    useEffect(()=>{
        fetchEvents();
    },[]);
    const options = eventData.map((val) => val.event_name);
    //console.log(options);
return ( <>
    <TitleBar/>
    <div className={style.mainContainer}>
        <div className={style.container}>
            <div className={style.addEventText}>ADD DECORATION</div>
                <form onSubmit={handleSubmit((data)=>{
                    console.log("Data : ",data);
                    let {decorationName , type , decorationPrice } = data;
                    // Send data to Server
                    axios
                        .post("http://localhost:3001/decoration/insertDecoration", 
                        {
                            decorationName,
                            type,
                            decorationPrice,
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
                        {errors.decorationName && <span>*{errors.decorationName.message}</span>}
                    </div>
                        <label>Decoration Name :</label> 
                        <select title='Select Decoration'
                        style={{"marginLeft":"21px"}}   className={style.select}
                            {...register("decorationName",{
                                required:{
                                    value:true,
                                    message:"Decoration Name is Required!"
                                }
                            })
                            }
                            
                        >
                        <option value='' style={{"color":"rgb(140, 135, 135)"}}>Select Decoration...</option>
                            {options.map(value => (
                                    <option key={value} value={value}>
                                    {value}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* Decoration Type */}
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.type && <span>*{errors.type.message}</span>}
                    </div>
                        <label>Decoration Name :</label>
                        <select title='Select Decoration Type'
                        style={{"marginLeft":"21px"}} className={style.select}
                            {...register("type",{
                                required:{
                                    value:true,
                                    message:"Decoration Type is Required!"
                                }
                            })
                            }
                        >
                            <option value='' style={{"color":"rgb(140, 135, 135)"}}>
                                Select Decoration Type...
                            </option>
                            <option value='Normal'>Normal</option>
                            <option value='Premium'>Premium</option>
                        </select>
                    </div>

                    {/* Decoration Price */}
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.decorationPrice && <span>*{errors.decorationPrice.message}</span>}
                    </div>
                        <label>Decoration Price :</label>
                        <input style={{"marginLeft":"25px"}}
                        type="text" placeholder="Enter Decoration Price..." className={style.input}
                            {...register("decorationPrice",{
                                required:{
                                    value:true,
                                    message:"Decoration Price is Required!"
                                },     
                                pattern: {
                                    value: /^[1-9]+[0-9]/i,
                                    message: "Only Numbers Allowed!",
                                },
                                maxLength:{
                                    value:5,
                                    message:"Minimum 5 Digit Can be Enter!"
                                },
                                min:{
                                    value:5000,
                                    message:"Minimum amount is 5,000!"
                                }
                            })
                            }
                        />
                    </div>
                    {/* Venue Address */}
                
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
</>  );
}

export default AddDecoration;