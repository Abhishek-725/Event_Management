import React from 'react';
import { useForm  } from 'react-hook-form';
import { useState , useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import TitleBar from './SubComponents/TitleBar';
import style from '../AdminCss/EventPage.module.css';
import { CiCircleRemove } from 'react-icons/ci';
import { AiFillEdit } from 'react-icons/ai';

const config = {
    headers : {'content-type' : 'multipart/form-data'},
};
function AddEvent() {
    var event_id,event_name,event_images;
    const [displayModal,setDisplayModal] = useState(false);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [data,setData] = useState([]);
    //Getting Event data from server
    const fetchEvents = ()=>{
        axios.get("http://localhost:3001/event")
                .then((result) => {
                console.log(result.data);
                setData(result.data.result);
                })
                .catch((err) => {
                console.log("Error :", err);
                });
    }
    useEffect(()=>{
        fetchEvents();
    },[]);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const getData = (value) => {
        event_id,event_name,event_images = value;
        
      }
//  **************************  Modal Box     *******************************************
const Modal = () => {
  
    const [modalFile, setModalFile] = useState();
    const [modalFileName, setModalFileName] = useState();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
return(<>

<div className={style.modal}>
    <div className={style.modal_content} >
        <span className={style.close} onClick={() => {setDisplayModal(!displayModal)}}>&times;</span>
        
        {/* modal */}
        {/* <div className={style.container}> */}
            <div className={style.addEventText}>ADD EVENT</div>
                <form onSubmit={handleSubmit((data)=>{
                    console.log("Data : ",data);
                    let {event_Name} = data;
                    // Send data to Server
                    // axios
                    //     .post("http://localhost:3001/event/InsertEvent", 
                    //     {
                    //         title:eventName,
                    //         image:file
                            
                    //     },config)
                    //     .then((res) => {
                    //         console.log(res);
                    //         if(res.data === "Data Save"){
                    //             Swal.fire({
                    //                         position: 'top',
                    //                         icon: 'success',
                    //                         title: 'Data Save Successfully!',
                    //                         showConfirmButton: true,
                    //                     })

                    //         }else{
                    //             alert("Data Fail Save Successfully!");
                    //         }
                    //         // alert("Login Successful!");
                    //     })
                    //     .catch((err) => {
                    //         console.log("Error is", err);
                    //     });
                })}>
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.event_Name && <span>*{errors.event_Name.message}</span>}
                    </div>
                        <label>Enter the Event Name :</label>
                        <input 
                        defaultValue={event_id}
                        type="text" placeholder="Enter Event Name..." className={style.input}
                            {...register("event_Name",{
                                required:{
                                    value:true,
                                    message:"Event Name is Required!"
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
                        <label>Enter the Event Image :</label>
                            <input
                            type="file" className={style.inputfile} 
                                {...register("image",{
                                required:{
                                    value:true,
                                    message:"Image is Required!"
                                },
                                onChange:(e) =>{
                                    if(e.target.files){                   
                                    setModalFile(e.target.files[0]);
                                    setModalFileName(e.target.files[0].name);}
                                },
                                pattern:{
                                    value:/(\.jpg|\.jpeg|\.png|\.gif)$/i,
                                    message:"Please upload file having extensions .jpeg/.jpg/.png/.gif only.'"
                                }
                            })}
                            />
                        </div>
                    </div>
                    <div>{modalFile!=undefined && <div className={style.modalImgDivBox}>
                        <p>Image Preview:</p>
                        <img src={URL.createObjectURL(modalFile)} className={style.modalPreviewImg} alt="Image"/>
                    </div>}
                </div>
                    <input type="submit" value="ADD" className={style.modalSubmitBtn} />
                    <input type="reset" value="RESET" className={style.modalSubmitBtn} />
                </form>
             
            {/* </div> */}

                
    </div>

</div>

</>    
        )
    }
    //***************          */ Modal Box End          *************************
return ( <>
    <div>
   {displayModal && <Modal/>}
        <TitleBar/>
        <div>
            {/* <div className={style.addEventText}>ADD EVENT</div> */}
            <div className={style.mainContainer}>
        
            <div className={style.container}>
            <div className={style.addEventText}>ADD EVENT</div>
                <form onSubmit={handleSubmit((data)=>{
                    console.log("Data : ",data);
                    let {eventName} = data;
                    // Send data to Server
                    axios
                        .post("http://localhost:3001/event/InsertEvent", 
                        {
                            title:eventName,
                            image:file
                            
                        },config)
                        .then((res) => {
                            console.log(res);
                            if(res.data === "Data Save"){
                                Swal.fire({
                                            position: 'top',
                                            icon: 'success',
                                            title: 'Data Save Successfully!',
                                            showConfirmButton: true,
                                        })

                            }else{
                                alert("Data Fail Save Successfully!");
                            }
                            // alert("Login Successful!");
                        })
                        .catch((err) => {
                            console.log("Error is", err);
                        });
                })}>
                    <div className={style.eventName}>
                    <div className={style.errorMsg}>
                        {errors.eventName && <span>*{errors.eventName.message}</span>}
                    </div>
                        <label>Enter the Event Name :</label>
                        <input 
                        type="text" placeholder="Enter Event Name..." className={style.input}
                            {...register("eventName",{
                                required:{
                                    value:true,
                                    message:"Event Name is Required!"
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
                        <label>Enter the Event Image :</label>
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

                <div>{file!=undefined && <div className={style.imgDivBox}>
                        <p>Image Preview:</p>
                        <img src={URL.createObjectURL(file)} className={style.previewImg} alt="Image"/>
                    </div>}
                </div>
            </div>
            
            <div style={{"width":"100%","marginTop":"3%"}} >
            {data.length > 0 && <>
            <hr style={{"width":"85%"}}></hr>
                <div className={style.selectTitle}>
                    Inserted Events
                </div>


                {/* add title row */}
                <div  className={style.singleItem}>
                            <div className={style.titleImage}>
                                <div><b>IMAGE</b></div>
                            </div>
                            <div className={style.selectRefreshname}>
                                <div>Event Id</div>
                            </div>
                            <div className={style.selectQty}>
                                <div style={{"marginLeft":"20px"}}>NAME</div>
                            </div>
                            
                            <div className={style.selectQty}>
                                <div style={{"marginLeft":"20px"}}>
                                    Edit
                                </div>
                            </div>
                            <div className={style.button}>
                                <div><b> Remove</b></div>
                            </div>
                        </div>
                {/* End of titile */}
            {
                data.map((value) => {
                    let {event_id,event_name,event_images} = value;
                    
                    return(<>
                        <div key={event_id} className={style.singleItem}>
                            <div>
                                <img src={event_images} className={style.userImage}/>
                            </div>
                            <div className={style.selectRefreshname}>
                                <span>{event_id}</span>
                            </div>
                            <div className={style.selectQty}>
                                <div>{event_name}</div>
                            </div>

                            <div className={style.selectQty}>
                                <div>
                                <i className={style.editIcon}
                                    onClick = {() => {
                                        getData(value);
                                        setDisplayModal(!displayModal)}}
                                >
                                    <AiFillEdit/>
                                </i>
                                </div>
                            </div>
                            <div className={style.button}>
                                <i className={style.removeIcon}
                                    onClick = {() => {removeRefreshmentItem(value)}}
                                >
                                    <CiCircleRemove />
                                </i>
                            </div>
                        </div>
                    </>)
                })

            }
            </>}
        </div>

        </div>
        
    </div>
</> );
}

export default AddEvent;

