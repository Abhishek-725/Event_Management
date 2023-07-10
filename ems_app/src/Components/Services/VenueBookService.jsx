import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UserNavBar from '../UserSubComponent/UserNavBar';
import style from '../../Css/VenueBookService.module.css';
import { TimePickerComponent , DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import ms from 'ms';
import { FaJs } from 'react-icons/fa';


function VenueBookServices() {
    //const [date , setDate] = useState();
    const location = useLocation();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // Time Variable
        const timeValue = new Date();
        const timeInterval = 60;
        const timeCustomFormat = 'HH:mm';
   
    if (location.state) {
        var {userVenueData} = location.state;
        localStorage.setItem("userVenue",JSON.stringify(userVenueData));
        //console.log(userVenueData);
        var {venue_name,venue_address,venue_image,venue_price} = userVenueData;
    }

    const disAbleDate = () =>{
        let today,day,month,year;
        today = new Date();
        day = today.getDate();
        if (day >= 30) {
            day = "" + "02";
            month = 0 + ""+ (today.getMonth() + 2);
            year = today.getFullYear();
            //console.log(year + "-" + month + "-" + day );
        } else {
            if (day <= 9) {
                day = "0" + (day + 2);
            }else{
                day = "" + (day + 2);
            }
            month = 0 + ""+ (today.getMonth() + 1);
            year = today.getFullYear();
            //console.log(year + "-" + month + "-" + day );
        }
        return year + "-" + month + "-" + day ;
    }
  
return ( <>

{userVenueData ? 
<> 
<UserNavBar/>
<div className={style.mainBody}>
    <div className={style.mainContainer}>
        <div className={style.venueDetails}>
            <div>
                <img src={venue_image} className={style.venueImage}/>
                <span className={style.venueName}>
                    {venue_name}
                </span>
                <span className={style.venueName}>
                    Address: {venue_address}
                </span>
                <span className={style.venueName}>
                    Price: $ {venue_price}
                </span>

            </div>

        </div>

        {/* Calendar And Time */}
        <div>
        <div>Please Select Date And Time Of Event</div>
            <form onSubmit={handleSubmit((data) => {
                console.log(data)
                let {date , time } = data;
                Swal.fire({
                        position: "top",
                        icon: "question",
                        title: "Proceed with the event.",
                        showConfirmButton: true,
                        showCancelButton:true
                        })
                        .then((result) => {
                            if(result.isConfirmed){
                                localStorage.setItem("eventDate",JSON.stringify(date));
                                localStorage.setItem("eventTime",JSON.stringify(time));
                                navigate('/UserEventDetail')
                            }
                        })
                    
            })}>
            <div>
            {errors.date && (
                <span className="errorMsg">*{errors.date.message}</span>
            )}
                <input  style={{"padding":"10px","marginTop":"10%","borderRadius":"10px",
                                "border":"2px dotted","marginBottom":"5%"}}
                type="date"
                defaultValue={disAbleDate()}
                min={disAbleDate()}
                onChange={(e) =>{
                    console.log(e.target.value);
                    
                }}
                {...register("date",{
                    required : {value:true,message:"Please select the date!"}
                } )}
                />
                
            </div>
            <div>
            {errors.time && (
                <span className={style.timeErrorMsg}>*{errors.time.message}</span>
              )}
                <input style={{"padding":"10px","marginTop":"10%","borderRadius":"10px",
                                "border":"2px dotted","width":"44%"}}
                    type="time"
                    onChange={(e) => {
                        console.log(e.target.value)
                    }}
                    {...register("time",{
                        required : {value:true,message:"Please select the time!"}
                    } )}
                />

                <div>
                    <div className={style.button}>
                        <input type="submit" value="Proceed" />
                    </div>
                </div>

            </div>
            </form>
        </div>

        
    </div>
</div> </> :
<p>Please select The Venue.</p>
}

</> );
}

export default VenueBookServices;