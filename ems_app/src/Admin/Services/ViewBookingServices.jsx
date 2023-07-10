import React, { useEffect, useState } from 'react';
import TitleBar from '../SubComponents/TitleBar';
import style from '../../AdminCss/ViewBooking.module.css';
import axios from 'axios';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

function ViewBookingServices() {
    
    const navigate = useNavigate();
    const [eventDetails,setEventdetails] = useState([]);
    // view detail
    const viewDetailFunc = (value) => {
        navigate('/ViewDetails',{state:value})
    }
    const fetchUserdetail = () => {
        axios.get("http://localhost:3001/eventDetails")
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
    <div className={style.viewBkText}>
        VIEW BOOKING
    </div>
    <div className={style.tableContainer}>
    {
    eventDetails.length > 0 &&<>
    <table className={style.customers}>
  <tr>
    <th>No.</th>
    <th>EventId</th>
    <th>User Name</th>
    <th>Event</th>
    <th>Venue</th>
    <th>Decoration</th>
    <th>Date</th>
    <th>Time</th>
    <th>Total Amount</th>
    <th>Status</th>
    <th>Details</th>
    </tr>
    
    {eventDetails.map((value,index) => {
        let {event_id,user_id,user_name,event_name,decoration_name,decoration_type,
        venue_name,venue_address,event_date,event_time,event_total,status} = value;
        return(<>
        <tr>
            <td>{index+1}</td>
            <td>{event_id}</td>
            <td>{user_name}</td>
            <td>{event_name}</td>
            <td>{venue_name}</td>
            <td>{decoration_name}</td>
            <td>{moment(event_date).format('D-MM-YYYY')}</td>
            <td>{event_time}</td>
            <td>{event_total}</td>
            <td>{status}</td>
            <td onClick={() => {viewDetailFunc(value)}} style={{"cursor":"pointer"}}>View Detail</td>
        </tr>
        </>)
    })}
    
    
    
    
</table>
    </>
}
    </div>
</div>    
</div>
</> );
}

export default ViewBookingServices;