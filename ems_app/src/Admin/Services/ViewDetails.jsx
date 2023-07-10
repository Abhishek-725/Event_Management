import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TitleBar from '../SubComponents/TitleBar';
import style from '../../AdminCss/ViewDetails.module.css';
import { useState } from 'react';
import { useForm  } from 'react-hook-form';
import Swal from "sweetalert2";
import axios from 'axios';

function ViewDetails() {
   
    const [details,setDetails] = useState([]);
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchDetails = () =>{
        if (location.state) {
            let detail = location.state;
            setDetails([detail]);
            //console.log(event_id);
        }
    }

    useEffect(() => {
        fetchDetails();
    },[])
return ( <>
<TitleBar/>
<div className={style.mainBody}>
<div className={style.mainContainer}>
{
    details && <>{details.map((value)=>{
        let {event_id,user_id,user_name,event_name,decoration_name,decoration_type,
            venue_name,venue_address,event_date,event_time,event_total,status} = value;
        return(<>
            <div className={style.detailContainer}>
            <div className={style.detailTxt}>User Event Details</div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Event Id: </label>
                </div>
                <div className={style.detailValue}>
                    <label>{event_id}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>User Name:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{user_name}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label> Event Type:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{event_name}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Decoration:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{decoration_name}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Decoration Type:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{decoration_type}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Venue:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{venue_name}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Venue Address:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{venue_address}</label>
                </div>
            </div>

            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Event Date:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{event_date}</label>
                </div>
            </div>
            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Event Time:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{event_time}</label>
                </div>
            </div>
            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Total Amount:</label>
                </div>
                <div className={style.detailValue}>
                    <label>{event_total}</label>
                </div>
            </div>
            <form onSubmit={handleSubmit((data) => {
                data = {...data,event_id}
                console.log(data);
                if(data){
                    Swal.fire({
                    title: 'Do you want update event status ?',
                    showCancelButton: true,
                    confirmButtonText: 'Update',
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            axios.post("http://localhost:3001/eventDetails/upDateStatus",data)
                            .then((response) => {
                                console.log(response);
                                if (response.data.Message === 'Success') {
                                    Swal.fire({
                                        position: "top",
                                        icon: "success",
                                        title: "Event status update successfully!",
                                        showConfirmButton: true,
                                    })
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                                Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: error.message,
                                        footer: '<a href="">Why do I have this issue?</a>',
                                        });
                            })
                        }
                    })
                }
            })}>
            <div className={style.singleDetail}>
                <div className={style.detailTitle}>
                    <label>Status :</label>
                </div>
                {errors.status && <>
                <span style={{"color":"red","position":"absolute","right":"14%",
                "fontSize":"10px"}}>*{errors.status.message}</span></>}
                <div className={style.detailValue}>
                    <label><select title='Select Decoration Type'
                        className={style.select}
                            {...register("status",{
                                required:{
                                    value:true,
                                    message:"Decoration Type is Required!"
                                }
                            })
                            }
                        >
                        <option value='' style={{"color":"rgb(140, 135, 135)"}}>
                                Update status...
                        </option>
                        <option value='Pending'>Pending</option>
                        <option value='Complete'>Complete</option>
                    </select></label>
                </div>
            </div>

            <div className={style.button}>
                    <input type="submit" value="Update" />
            </div>
            </form>


        </div>
        </>)
    })}
        
        
    </>
}

</div>
</div>
</> );
}

export default ViewDetails;