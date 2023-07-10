import React from 'react';
import { useLocation , Link } from 'react-router-dom';
import UserNavBar from '../UserSubComponent/UserNavBar';
import { useState , useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import style from '../../Css/DecorationService.module.css'


function DecorationServices() {
    let decoration;
    const [decorationData , setDecorationData] = useState([]);
    const location = useLocation();
    // Setting User Decoration Type by seleted event
    if (location.state) {
        var {UserEventData} = location.state;
        console.log(UserEventData);
        //console.log(location.pathname);
    }
    else{
        // Setting User already selected Decoration
            if (localStorage.getItem("userEventData")) {
                UserEventData = JSON.parse(localStorage.getItem("userEventData"));
                console.log("localstorage UserEventData:",UserEventData);
            }
    }
    // setting user decoration locally
    const saveUserDecoration = () => {
        console.log("save deco");
    }
    //Getting Event data from server
    const fetchEvents = ()=>{
        const res = axios.get("http://localhost:3001/decoration")
                .then((result) => {
                //console.log(result);
                setDecorationData(result.data.result);
                })
                .catch((err) => {
                console.log("Err :", err);
                });
        }
        // Setting User Decoration Data
        const setUserDecoration = (value) => {
                if (value) {
                    localStorage.setItem("userDecoration",JSON.stringify(value));
                }
        }
    useEffect(()=>{
        fetchEvents();
    },[]);
    if (UserEventData) {
        console.log(UserEventData.event_name);
        decoration = decorationData
        .filter((val) => val.decoration_name === UserEventData.event_name );
    }
    else{
        decoration = decorationData;
    }
return (<>
    <UserNavBar/>
    <div className={style.titleTxt}> 
    {UserEventData ? <>{UserEventData.event_name} DECORATION</> : <>DECORATION</>}
    </div>
    <div className={style.mainBody}>
        <div className={style.mainContainer}>
        {decoration.length>0 && decoration.map((value) =>{
                const {decoration_id,decoration_name,decoration_type,decoration_price,decoration_image} = value;
                return(
                        <div className={style.card} key={decoration_id} >
                            <Link to={!UserEventData ? '/VenueServices' : '/MenuServices'} state={{"UserDecorationData":value}}>
                                {/* /VenueServices /MenuServices*/}
                                <div onClick={() => {setUserDecoration(value)}}>
                                    <img src={decoration_image} className={style.image}/>
                                </div>    
                                    
                            </Link>
                            {!UserEventData && 
                                    <div className={style.eventName}>{decoration_name}</div>} 
                                <div className={style.eventsubDetail}>
                                    <div>Type : {decoration_type}</div>
                                    <div>Price : Rs.{decoration_price}</div>
                                </div>
                        
                        </div>
                );
            }
            )}

        </div>
    </div>
    
</>  );
}

export default DecorationServices;