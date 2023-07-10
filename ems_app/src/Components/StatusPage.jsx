import React ,{ useState } from 'react';
import { useEffect } from 'react';
import style from '../Css/Status.module.css';
import UserNavBar from './UserSubComponent/UserNavBar';
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Stripe from './Payment/Stripe';
import { useNavigate } from 'react-router-dom';


function StatusPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const [eventDetails,setEventdetails] = useState([]);
    const [status,setStatus] = useState(false);
    const fetchEventDetails = () => {
        if (localStorage.getItem("userData")) {
            let userInfo = JSON.parse(localStorage.getItem("userData"));
            console.log(userInfo.userId);
            let userId = userInfo.userId;
            axios.post("http://localhost:3001/eventDetails/getDetail",{userId})
            .then((response) => {
                console.log(response.data);
                if (response.data.result) {
                    setEventdetails([response.data.result]);
                    if(response.data.result.status === "Accept"){
                        setStatus(response.data.result.status);
                    }
                    console.log(eventDetails.length);
                    //console.log(response.data.result.status);
                }

            })
            .catch((error) => {
                console.log(error);
            })
            }
    }
    useEffect(() => {
        fetchEventDetails();
    },[])
return ( <>
<UserNavBar/>
<div className={style.mainBody}>
<div className={style.mainContainer}>
    <div className={style.noteBox}>
        {eventDetails.length > 0 ?
        <div style={{"width":"50%","textAlign":"center","marginLeft":"27%"}}>
        Once Your Order gets Confirmed You will get a message for further 
        payment process.Please Have a patience  till we redirect to you.</div> :
        <div style={{"width":"50%","textAlign":"center","marginLeft":"25%"}}>Once you place order it will display here!</div>}
    </div>
    <div className={style.tableContainer}>
    {
    eventDetails.length > 0 && <>
    <div className={style.eventDetailText}>Your Event Details</div>
<table className={style.customersDetail}>
    <tr>
        <th>No.</th>
        <th>EventId</th>
        <th>User Name</th>
        <th>Event</th>
        <th>Venue</th>
        <th>Decoration</th>
        <th>Date</th>
        <th>Time</th>
        <th>Total Cost</th>
    </tr>
    
            {eventDetails.map((value,index) => {
                let {event_id,user_id,user_name,event_name,decoration_name,decoration_type,
                venue_name,venue_address,event_date,event_time,event_total,status} = value;
                return(<>
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{event_id}</td>
                    <td>{user_name}</td>
                    <td>{event_name}</td>
                    <td>{venue_name}</td>
                    <td>{decoration_name}</td>
                    <td>{event_date}</td>
                    <td>{event_time}</td>
                    <td>{event_total}</td>
                </tr>
                </>)
            
            })}
        </table>
    </>
    }
    </div>

    <div className={style.AmountBox}>
        {
        status && <>
                <div>
                    <div className={style.mssage}>
                        Event order is accepted please pay the mimimum amount to start the 
                        work.
                    </div>
                    <div className={style.amountNote}>
                        *Total Minimum Amount to be paid in Advance atleast Rs.50000/-. 
                    </div>
                    <div style={{"textAlign":"center","marginTop":"1%"}}>
                    <div className={style.errorMsg}>
                        {errors.amount && <span>*{errors.amount.message}</span>}
                    </div>
                        <form onSubmit={handleSubmit((data) => {
                            console.log(data)
                            
                            data = {...data,eventDetails};
                            Swal.fire({
                                    title: 'Proceed for Payment?',
                                    showCancelButton: true,
                                    confirmButtonText: 'Proceed',
                                })
                                .then((result) => {
                                    if(result.isConfirmed){
                                        navigate('/Stripe',{state:data});  
                                    }
                                })

                        })}>
                            <label className={style.labelAmount}>Please Enter The Amount:</label>
                            <input className={style.amountInput}
                            type='text'
                                {...register("amount",{
                                required:{
                                    value:true,
                                    message:"Please enter the amount!"
                                },     
                                pattern: {
                                    value: /^[1-9]+[0-9]/i,
                                    message: "Only Numbers Allowed!",
                                },
                                max:{
                                    value:2000000,
                                    message:"Maxmum amount can be enter is 20,00,000!!"
                                },
                                min:{
                                    value:50000,
                                    message:"Minimum amount is 50,000!"
                                }
                            })
                            }
                            />
                            <div>
                                <div className={style.button}>
                                    <input type="submit"  />
                                </div>
                            </div>
                        </form>
                    </div>
                
                </div>
            </>
        }
    </div>

</div>
</div>

</> );
}

export default StatusPage;