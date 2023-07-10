import React from 'react';
import NavBar from './SubComponents/NavBar';
import TitleBar from './SubComponents/TitleBar';
import style from '../AdminCss/AdminHome.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment/moment';
import Swal from "sweetalert2";

function AdminHomePage() {
    const [eventDetails,setEventdetails] = useState([]);
    
    const acceptOrder = (value) => {
        let {event_id,user_id}= value;
        console.log(event_id,user_id);
        let status= 'Accept';
        Swal.fire({
            title: 'Do you want to accept the event?',
            showCancelButton: true,
            confirmButtonText: 'Accept',
        })
        .then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:3001/eventDetails/acceptOrder",{event_id,user_id,status})
                .then((response) => {
                    console.log(response);
                    if (response.data.Message === 'Success') {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Event save successfully!",
                            showConfirmButton: true,
                          })
                    }
                })
                .catch((error) => {
                    ;console.log(error);
                })
            }
        })
    }

    // reject /rejectOrder
 const rejectOrder = (value) => {
        let { event_id,user_id} = value;
        console.log(event_id,user_id);
        Swal.fire({
            title: 'Are you sure you want reject this event?',
            showCancelButton: true,
            confirmButtonText: 'Reject',
        })
        .then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:3001/eventDetails/rejectOrder",{event_id,user_id})
                .then((response) => {
                    console.log(response);
                    if (response.data.Message === 'Success') {
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Event rejected!",
                            showConfirmButton: true,
                        })
                    }
                })
                .catch((error) => {
                    ;console.log(error);
                })
            }
        })

    }
    const fetchUserdetail = () => {
        axios.get("http://localhost:3001/eventDetails/newEvnet")
        .then((response) => {
            console.log(response.data);
            if (response.data.result) {
                setEventdetails(response.data.result);
            }

        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        fetchUserdetail();
    },[])
return ( <>
<TitleBar/>
<div className={style.mainBody}>
<div className={style.mainContainer}>
{
    eventDetails.length > 0 &&<>
    <table className={style.customers}>
  <tr>
    <th>No.</th>
    <th>EventId</th>
    <th>UserId</th>
    <th>User Name</th>
    <th>Event</th>
    <th>Venue</th>
    <th>Decoration</th>
    <th>Date</th>
    <th>Time</th>
    <th>Total Amount</th>
    <th>Accept/Reject</th>
    </tr>
    {/* <tr>
        <td>Alfreds </td>
        <td>Maria Anders</td>
        <td>Germany</td>
    </tr> */}
    
    {eventDetails.map((value,index) => {
        let {event_id,user_id,user_name,event_name,decoration_name,decoration_type,
        venue_name,venue_address,event_date,event_time,event_total,status} = value;
        return(<>
        <tr>
            <td>{index+1}</td>
            <td>{event_id}</td>
            <td>{user_id}</td>
            <td>{user_name}</td>
            <td>{event_name}</td>
            <td>{venue_name}</td>
            <td>{decoration_name}</td>
            <td>{moment(event_date).format('D-MM-YYYY')}</td>
            <td>{event_time}</td>
            <td>{event_total}</td>
            <td>
                <button onClick={() => {acceptOrder(value)}} className={style.acceptBtn}>Accept</button>
                <button onClick={() => {rejectOrder(value)}} className={style.rejectBtn}>Reject</button>
            </td>
        </tr>
        </>)
    })}
    
    
    
    
</table>
    </>
}

</div>
</div>

</> );
}

export default AdminHomePage;