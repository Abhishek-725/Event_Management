import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import UserNavBar from '../UserSubComponent/UserNavBar';
import style from '../../Css/venueService.module.css'
import axios from 'axios';

function VenueServices(props) {
    const [userVenue , setUserVenue] = useState();
    const [venueData , setVenueData] = useState([]);
    const location = useLocation();
    // if (location.state) {
    //     console.log("Decoration:",location.state.UserDecorationData. decoration_name);
    // }
    const fetchVenue = () => {
        axios.get("http://localhost:3001/venue")
        .then((result) => {
            console.log(result);
            setVenueData(result.data.result);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(()=>{
        fetchVenue();
    },[])

return ( <>
    <div className={style.mainBody}>
        <UserNavBar/>
        <div className={style.mainContainer}>
        {
            venueData.length>0 && venueData.map((value) =>{
                const {venue_id , venue_name , venue_address , venue_price , venue_image} = value;
                return(
                        <div className={style.card} key={venue_id} onClick={()=>{
                            setUserVenue(value);
                        }
                        }>
                            <Link to='/VenueBookServices' state={{"userVenueData":value}}>
                            {/* /VenueServices */}
                                <img src={venue_image} className={style.image}/>
                                
                                <div className={style.eventName}>{venue_name}</div>
                            </Link>
                        </div>
                );
            })
        }

        </div>


    </div>

</>);
}

export default VenueServices;