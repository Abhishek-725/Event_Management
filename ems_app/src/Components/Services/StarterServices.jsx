import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserNavBar from '../UserSubComponent/UserNavBar';
import axios from 'axios';
import Swal from "sweetalert2";
import style from '../../Css/Starter.module.css'
import LoadingPage from '../UserSubComponent/LoadingPage';
import {CiCircleRemove} from 'react-icons/ci';


function StarterServices() {
    // quantity variable
    const navigate = useNavigate();
    const [starterData,setStarterData] = useState([]);
    const [userStarter,setUserStarter] = useState([]);
    const [quantity , setQuantity] = useState(0);
    const [starterTotal , setStarterTotal] = useState(0);
    console.log("Total:",starterTotal);

    

    // adding user starter to list
    const addDessertItem = (value) => {
        if (quantity > 0) {
            console.log(userStarter.includes(value));
            if (userStarter.includes(value,0)) {
                console.log("include");
                return;
            }
            console.log("val : ",value);
            setUserStarter([...userStarter,value]);
            setStarterTotal(starterTotal + (quantity * value.starter_price));
            
        } else {
            Swal.fire({
                position: "top",
                icon: "info",
                title: "Please enter number of person",
                showConfirmButton: true,
            })
        }
    }
    // ******       remove user starter to list       ***************
    const removeDessertItem = (value) =>{
        console.log("remove",value.starter_id);
        if (value.starter_id) {
            let newItem = userStarter.filter((val) => val.starter_id !== value.starter_id)
            setUserStarter(newItem);
            setStarterTotal(starterTotal - (quantity * value.starter_price));
        }

    }
    //  ******    Fetch starter Data from backend      ***************
    const fetchStarter = async() => {
        axios.get('http://localhost:3001/starter')
        .then((respone) => {
            if (respone.data.result) {
                console.log(respone.data.result);
                setStarterData(respone.data.result);
                // setting user starter from store
                if (localStorage.getItem("userStarter")) {
                    console.log(JSON.parse(localStorage.getItem("userStarter")));
                    let starterDetail = JSON.parse(localStorage.getItem("userStarter"));
                    setUserStarter(starterDetail);
                    setQuantity(JSON.parse(localStorage.getItem("starterQuantity")));
                    setStarterTotal(JSON.parse(localStorage.getItem("starterTotal")))
                    //console.log(userStarter);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    // set total amount
    const setTotalAmount = (qty) => {
        //console.log("qty",quantity);
        let total = userStarter.reduce((accumulate,value) => {
            console.log(value.starter_price);
            return accumulate + (qty * value.starter_price);
        },0)
        //console.log("total",total);
        setStarterTotal(total);
    }
    // save user starter data locally
    const saveUserStarter = () => {
        if (userStarter.length > 0) {
            if (userStarter.length>0) {
                Swal.fire({
                    title: 'Do you want to save the info and move?',
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("userStarter",JSON.stringify(userStarter));
                        localStorage.setItem("starterQuantity",quantity);
                        localStorage.setItem("starterTotal",starterTotal);
                        console.log(JSON.parse(localStorage.getItem("userStarter")));
                        navigate('/VegServices');
                    }
                })
                
                
            }
            
        }
        else{
            navigate('/VegServices');
        }
    }

    const previousClicked = () =>{
        console.log("previous");
        if (userStarter.length > 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
                .then((result) =>{
                    if (result.isConfirmed) {
                        localStorage.setItem("userStarter",JSON.stringify(userStarter));
                        localStorage.setItem("starterQuantity",quantity);
                        localStorage.setItem("starterTotal",starterTotal);
                        navigate(-1);
                    }
                })
                
                } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("userStarter");
                        localStorage.removeItem("starterQuantity");
                        localStorage.removeItem("starterTotal");
                        navigate(-1);
                    }
                })
                }
            })
        } else {
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchStarter();
    },[])
return ( <>
<UserNavBar/>
{starterData.length > 0 ? <div className={style.mainBody}>
    <div className={style.title}> STARTER</div>
    <div className={style.quantity}>
        <label><b>Plaese enter number of person/plate : </b></label>
        <input type="number" 
            className={style.qtyNumInput}
            onChange={(e) => {
                if(e.target.value > 0){
                    setQuantity(e.target.value);
                    setTotalAmount(e.target.value);
                }
            }}
        />
    </div>
    <div className={style.mainContainer}>
    {
        starterData.length>0 ? <>{starterData.map((value) =>{
            const { starter_id , starter_name , 
                starter_description , starter_price, starter_image} = value;
                return(
                        <div className={style.card} key={starter_id} >
                        
                            {/* /VenueServices */}
                                <img src={starter_image} className={style.image}/>
                                
                                <div className={style.eventName}>{starter_name}</div>
                                <div className={style.price}><b>$ {starter_price}</b></div>
                                <div className={style.description}>
                                    <b>Description: </b>{starter_description}
                                </div>
                            
                            <div>
                                <button className={style.btnAdd} 
                                onClick={() => {addDessertItem(value)}}>
                                    Add To List
                                </button>
                            </div>
                        </div>
                );
            })}</> : <LoadingPage/>
        }
        {/* User selected starter */}
        <div style={{"width":"100%"}} >
            {userStarter.length > 0 && <>
            <hr style={{"width":"85%"}}></hr>
                <div className={style.selectTitle}>
                    Your Selected Item
                </div>
                <div className={style.totalAmount}>
                    Total Amount Of Starter : Rs.{starterTotal}
                </div>

                {/* add title row */}
                <div  className={style.singleItem}>
                            <div className={style.titleImage}>
                                <div><b>IMAGE</b></div>
                            </div>
                            <div className={style.selectRefreshname}>
                                <div>NAME</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>QUANTITY</div>
                            </div>
                            <div className={style.selectQty}>
                                <div style={{"marginLeft":"22px"}}>PRICE</div>
                            </div>
                            <div className={style.selectQty}>
                                <div style={{"marginLeft":"15px"}}>
                                    SUBTOTAL
                                </div>
                            </div>
                            <div className={style.button}>
                                <div><b> Remove</b></div>
                            </div>
                        </div>
                {/* End of titile */}
            {
                userStarter.map((value) => {
                    let { starter_id , starter_name , 
                starter_description , starter_price, starter_image} = value;
                    
                    return(<>
                        <div key={starter_id + starter_name} className={style.singleItem}>
                            <div>
                                <img src={starter_image} className={style.userImage}/>
                            </div>
                            <div className={style.selectRefreshname}>
                                <span>{starter_name}</span>
                            </div>
                            <div className={style.selectQty}>
                                <div>{quantity}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>{starter_price}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>
                                    {quantity * starter_price}
                                </div>
                            </div>
                            <div className={style.button}>
                                <i className={style.removeIcon}
                                    onClick = {() => {removeDessertItem(value)}}
                                >
                                    <CiCircleRemove/>
                                </i>
                            </div>
                        </div>
                    </>)
                })

            }
            </>}
        </div>
        {/* back and nect button */}
        {/* {userStarter.length > 0 && */}
        <div className={style.back_next}>
            <span className={style.previous} onClick = {previousClicked}>
                &laquo; Previous
            </span>
            
                <span className={style.next} onClick = {saveUserStarter}>
                    Next&raquo;
                </span>
        </div>
        {/* } */}
    </div>

</div> : <LoadingPage/>}
</> );
}

export default StarterServices;