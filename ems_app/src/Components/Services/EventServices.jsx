import React, { useEffect, useState } from 'react';
import axios from "axios";
import UserNavBar from '../UserSubComponent/UserNavBar';

import style from '../../Css/EventServices.module.css'
import { Link } from 'react-router-dom';
import LoadingPage from '../UserSubComponent/LoadingPage';




function EventServices() {
    //const[ userEventDetail , setUserEventdetail] = useState();
    const [data,setData] = useState([]);
    //Getting Event data from server
    const fetchEvents = ()=>{
        const res = axios.get("http://localhost:3001/event")
                .then((result) => {
                console.log(result);
                setData(result.data.result);
                })
                .catch((err) => {
                console.log("Error :", err);
                });
       }
    useEffect(()=>{
        fetchEvents();
    },[]);

const saveUserEvent = (val)=>{
    console.log(val);
    localStorage.setItem("userEventData",JSON.stringify(val));
}
return (<>
    <UserNavBar/>
   {data.length > 0 ? <div className={style.mainBody}>
        <div className={style.mainContainer}>
        {data.length>0 && data.map((value) =>{
                const {event_id , event_name , event_images} = value;
                return(
                        <div className={style.card} key={event_id} onClick={()=>{
                            saveUserEvent(value);
                        }
                        }>
                        <div>
                            <Link to='/DecorationServices' state={{"UserEventData":value}}>
                            {/* /VenueServices */}
                                <img src={event_images} className={style.image}/>
                                
                                <div className={style.eventName}>{event_name}</div>
                            </Link>
                        </div>
                        </div>
                );
            }
            )}

        </div>
    </div>:<LoadingPage/>}
</>  );
}

export default EventServices;