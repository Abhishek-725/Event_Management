import React from 'react';
import { useLocation , Link, useNavigate } from 'react-router-dom';
import UserNavBar from '../UserSubComponent/UserNavBar';
import { useState , useEffect } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import style from '../../Css/UserEvent.module.css'
import { useForm } from "react-hook-form";


function UserEventDetail() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    var totalAmount1;
    const [userName,setUserName] = useState();
    const [userId,setUserId] = useState();
    const [eventName , setEventName] = useState();
    const [venueName , setVenueName] = useState();
    const [decorationName , setDecorationName] = useState();
    const [decorationType , setDecorationType] = useState();
    const [venueAddress , setVenueAddress] = useState();
    const [totalAmount,setTotalAmount] = useState(0);
    const [date , setDate] = useState();
    const [time , setTime] = useState();
    var eventDate,eventTime;
    let decorationTotal = 0 ,venueTotal = 0,refreshTotal = 0,
    starterTot = 0,dessertTot = 0,vegtot = 0,nonVegTot = 0;

    var id,userData,userEventData,userDecoration,userVenue,userRefreshMent,userStarter,
    userDessert,userVegDish,userNonVegDish;

    var dessertQuantity,dessertTotal,userNonVegDishTotal,userNonVegDishQuantity,
    userVegDishTotal,userVegDishQuantity,starterQuantity,starterTotal,refrehMentTotal,refrehMentQuantity;
    const fetchEventdetails = () => {
    
        // date and time
        if (localStorage.getItem("eventDate")) {
            eventDate = JSON.parse(localStorage.getItem("eventDate"));
            eventTime = JSON.parse(localStorage.getItem("eventTime"));
            setDate(eventDate);
            setTime(eventTime);
            //console.log("Date and Time",eventDate,eventTime);
        }
        // user date
        if (localStorage.getItem("userData")) {
            userData = JSON.parse(localStorage.getItem("userData"));
            setUserName(userData.firstName+" "+userData.lastName)
            setUserId(userData.userId);
            console.log("userData",userData);
            console.log(userData.firstName+" "+userData.lastName);
        }
        // event data
        if (localStorage.getItem("userEventData")) {
            userEventData = JSON.parse(localStorage.getItem("userEventData"));
            setEventName(userEventData.event_name);
            console.log("user",userEventData.event_name);
        }
        // decoration
        if (localStorage.getItem("userDecoration")) {
            userDecoration= JSON.parse(localStorage.getItem("userDecoration"));
            setDecorationType(userDecoration.decoration_type);
            setDecorationName(userDecoration.decoration_name)
            console.log("user",userDecoration);
            decorationTotal = parseInt(JSON.parse(userDecoration.decoration_price));
            console.log(decorationTotal);
            //console.log(userDecoration.decoration_price);
        }
        // venue
        if (localStorage.getItem("userVenue")) {
            userVenue= JSON.parse(localStorage.getItem("userVenue"));
            setVenueName(userVenue.venue_name);
            setVenueAddress(userVenue.venue_address);
            console.log("user",userVenue);
            venueTotal = parseInt(JSON.parse((userVenue.venue_price)));
            console.log(venueTotal);
            
        }
        // food refrehent
        if (localStorage.getItem("userRefreshMent")) {
            userRefreshMent = JSON.parse(localStorage.getItem("userRefreshMent"));
            refrehMentQuantity = JSON.parse(localStorage.getItem("refrehMentQuantity"));
            refrehMentTotal = JSON.parse(localStorage.getItem("refrehMentTotal"));
            console.log("user",userRefreshMent);
            refreshTotal = parseInt(JSON.parse(refrehMentTotal));
        }
        // starter
        if (localStorage.getItem("userStarter")) {
            userStarter = JSON.parse(localStorage.getItem("userStarter"));
            starterQuantity = JSON.parse(localStorage.getItem("starterQuantity"));
            starterTotal = JSON.parse(localStorage.getItem("starterTotal"));
            console.log("user",userStarter);
            starterTot = parseInt(JSON.parse(starterTotal));
        }
        // dessert
        if (localStorage.getItem("userDessert")) {
            userDessert = JSON.parse(localStorage.getItem("userDessert"));
            dessertQuantity = JSON.parse(localStorage.getItem("dessertQuantity"));
            dessertTotal = JSON.parse(localStorage.getItem("dessertTotal"));
            console.log("user",userDessert);
            dessertTot = parseInt(JSON.parse(dessertTotal));
        }
        // veg
        if (localStorage.getItem("userVegDish")) {
            userVegDish = JSON.parse(localStorage.getItem("userVegDish"));
            userVegDishQuantity = JSON.parse(localStorage.getItem("userVegDishQuantity"));
            userVegDishTotal = JSON.parse(localStorage.getItem("userVegDishTotal"));
            console.log("user",userVegDish);
            vegtot = JSON.parse(userVegDishTotal);
        }
        // non veg
        if (localStorage.getItem("userNonVegDish")) {
            userNonVegDish = JSON.parse(localStorage.getItem("userNonVegDish"));
            userNonVegDishQuantity = JSON.parse(localStorage.getItem("userNonVegDishQuantity"));
            userNonVegDishTotal = JSON.parse(localStorage.getItem("userNonVegDishTotal"));
            console.log("user",userNonVegDish);
            nonVegTot = JSON.parse(userNonVegDishTotal);
        }
    setTotal(decorationTotal,venueTotal,refreshTotal,dessertTot,starterTot,vegtot,nonVegTot);
    
    }
    const setTotal = (decorationTotal,venueTotal,refreshTotal,dessertTot,starterTot,vegtot,nonVegTot) => {
        
        totalAmount1 = decorationTotal+venueTotal+refreshTotal+dessertTot+starterTot+vegtot+nonVegTot;
        console.log(totalAmount1);
        setTotalAmount(totalAmount1)
    }
    // send Refreshment
    const sendRefreshMent = () =>{
        console.log("i run",userRefreshMent);
        if (userRefreshMent) {
            userRefreshMent.forEach(element => {
                let elements = {...element,userId,refrehMentQuantity,refrehMentTotal};
                console.log(elements.userId);
                console.log(elements.refreshMent_id);
                
                if (elements) {
                    axios.post("http://localhost:3001/userRefrehMent/insertUserRefreshMent",
                    {elements})
                    .then((reponse) => {
                        console.log(reponse);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
                console.log("refresh run");
            });
        }
        
    }
    // send Starter
        const sendStarter = () =>{
            if (userStarter) {
                //console.log("i run",userStarter);
                userStarter.forEach(element => {
                    let elements = {...element,userId,starterQuantity,starterTotal};
                    console.log(elements);
                    if (elements) {
                        axios.post("http://localhost:3001/userStarter/insertUserStarter",
                        {elements})
                        .then((reponse) => {
                            console.log(reponse.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                    
                });
            }
            
        }
        // send dessert
                const sendDessert= () =>{
                    if (userDessert) {
                    
                        userDessert.forEach(element => {
                            let elements = {...element,userId,dessertQuantity,dessertTotal}
                            console.log(elements);
                            if (elements) {
                                axios.post("http://localhost:3001/userDessert/insertUserDessert",
                                {elements})
                                .then((reponse) => {
                                    console.log(reponse.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                            }
                            
                        });
                    }
                    
                }

     // send dish veg
     const sendDish= () =>{
        if (userVegDish || userNonVegDish) {
            if (userVegDish) {
                userVegDish.forEach(element => {
                    let elements = {...element,userId,userVegDishQuantity,userVegDishTotal}
                    console.log(elements);
                    if (elements) {
                        axios.post("http://localhost:3001/userDish/insertUserDish",
                        {elements})
                        .then((reponse) => {
                            console.log(reponse.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                    console.log("refresh run");
                })
            }
            // non veg
            if (userNonVegDish) {
                userNonVegDish.forEach(element => {
                    let elements = {...element,userId,userNonVegDishQuantity,userNonVegDishTotal}
                    //console.log("change",elements);
                    console.log(element);
                    if (elements) {
                        axios.post("http://localhost:3001/userDish/insertUserDish",
                        {elements})
                        .then((reponse) => {
                            console.log(reponse.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                    console.log("nonveg run");
                })
            }

        ;
        }
    }

    // send event details
    const sendEventDetails = () =>{
        axios.post("http://localhost:3001/eventDetails/insertDetail",
                        {userId,userName,eventName,venueName,decorationName,decorationType,
                        venueAddress,date,time,totalAmount})
                        .then((response) => {
                            console.log(response)
                            if (response.status == 200) {
                                Swal.fire({
                                    position: "top",
                                    icon: "success",
                                    title: "Request Send Successfully!",
                                    showConfirmButton: true,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate('/');
                                }
                            })

                            }

                        })
                        .catch((error) => {
                            console.log(error)
                        })
    }


    useEffect(() => {
        fetchEventdetails();
    },[])
return ( <>
<UserNavBar/>
<div className={style.mainBody}>
<div className={style.mainContainer}>
    <div className={style.displayBox}> 
        <div className={style.eventDetailText}>
            YOUR BOOKING DETAILS
        </div>
        <hr style={{"width":"85%"}}></hr>
        <div>
            <div className={style.details}>
                <div className={style.detailHead}>Event Type : </div>
                <div className={style.detailValue}>{eventName}</div>
            </div>
            <div className={style.details}>
                <div className={style.detailHead}>Decoration Type : </div>
                <div className={style.detailValue}>{decorationType}</div>
            </div>
            <div className={style.details}>
                <div className={style.detailHead}>Venue : </div>
                <div className={style.detailValue}>{venueName}</div>
            </div>
            <div className={style.details}>
                <div className={style.detailHead}>Venue Address : </div>
                <div className={style.detailValue}>{venueAddress}</div>
            </div>
            <div className={style.details}>
                <div className={style.detailHead}>Date : </div>
                <div className={style.detailValue}>{date}</div>
            </div>
            <div className={style.details}>
                <div className={style.detailHead}>Time : </div>
                <div className={style.detailValue}>{time}</div>
            </div>
            <div className={style.details}>
                <div className={style.detailHead}>Total Amount : </div>
                <div className={style.detailValue}>{totalAmount}</div>
            </div>
            <div className={style.button}>
                    <form onSubmit={handleSubmit(()=>{
                        console.log("running")
                        sendStarter();
                        sendRefreshMent();
                        sendDessert();
                        sendDish();
                        sendEventDetails();

                    })}>
                        <input type="submit" value="Send Request" />
                    </form>
            </div>
        </div>
    </div>
</div>
</div>
</> );
}

export default UserEventDetail;