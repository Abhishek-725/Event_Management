import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserNavBar from '../UserSubComponent/UserNavBar';
import axios from 'axios';
import Swal from "sweetalert2";
import style from '../../Css/Starter.module.css'
import LoadingPage from '../UserSubComponent/LoadingPage';
import {CiCircleRemove} from 'react-icons/ci';


function DessertServices() {
    // quantity variable
    const navigate = useNavigate();
    const [dessertData,setDessertData] = useState([]);
    const [userDessert,setUserDessert] = useState([]);
    const [quantity , setQuantity] = useState(0);
    const [dessertTotal , setDessertTotal] = useState(0);
    console.log("Total:",dessertTotal);
   
    

    // adding user starter to list
    const addStarterItem = (value) => {
        if (quantity > 0) {
            console.log(userDessert.includes(value));
            if (userDessert.includes(value,0)) {
                console.log("include");
                return;
            }
            console.log("val : ",value);
            setUserDessert([...userDessert,value]);
            setDessertTotal(dessertTotal + (quantity * value.desert_price));
            
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
    const removeStarterItem = (value) =>{
        console.log("remove",value.desert_id);6
        if (value.desert_id) {
            let newItem = userDessert.filter((val) => val.desert_id !== value.desert_id)
            setUserDessert(newItem);
            setDessertTotal(dessertTotal - (quantity * value.desert_price));
        }

    }
    //  ******    Fetch starter Data from backend      ***************
    const fetchStarter = async() => {
        axios.get('http://localhost:3001/dessert')
        .then((respone) => {
            if (respone.data.result) {
                console.log(respone.data.result);
                setDessertData(respone.data.result);
                // setting user starter from store
                if (localStorage.getItem("userDessert")) {
                    console.log(JSON.parse(localStorage.getItem("userStarter")));
                    let starterDetail = JSON.parse(localStorage.getItem("userDessert"));
                    setUserDessert(starterDetail);
                    setQuantity(JSON.parse(localStorage.getItem("dessertQuantity")));
                    setDessertTotal(JSON.parse(localStorage.getItem("dessertTotal")))
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
        let total = userDessert.reduce((accumulate,value) => {
            console.log(value.starter_price);
            return accumulate + (qty * value.starter_price);
        },0)
        //console.log("total",total);
        setDessertTotal(total);
    }
    // save user starter data locally
    const saveUserStarter = () => {
        if (userDessert.length > 0) {
            if (userDessert.length>0) {
                Swal.fire({
                    title: 'Do you want to save the info and move?',
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("userDessert",JSON.stringify(userDessert));
                        localStorage.setItem("dessertQuantity",quantity);
                        localStorage.setItem("dessertTotal",dessertTotal);
                        console.log(JSON.parse(localStorage.getItem("userDessert")));
                        navigate('/VenueServices');
                    }
                })
                
                
            }
            
        }
        else{
            navigate('/VenueServices');
        }
    }

    const previousClicked = () =>{
        console.log("previous");
        if (userDessert.length > 0) {
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
                        localStorage.setItem("userDessert",JSON.stringify(userDessert));
                        localStorage.setItem("dessertQuantity",quantity);
                        localStorage.setItem("dessertTotal",dessertTotal);
                        navigate(-1);
                    }
                })
                
                } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("userDessert");
                        localStorage.removeItem("dessertQuantity");
                        localStorage.removeItem("dessertTotal");
                        navigate(-1);
                    }
                })
                }
            })
        } else {
            localStorage.removeItem("userDessert");
            localStorage.removeItem("dessertQuantity");
            localStorage.removeItem("dessertTotal");
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchStarter();
    },[])
return ( <>
<UserNavBar/>
{dessertData.length > 0 ? <div className={style.mainBody}>
    <div className={style.title}> DESSERT</div>
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
        dessertData.length>0 ? <>{dessertData.map((value) =>{
            const { desert_id , desert_name, 
                    desert_description , desert_price, desert_image} = value;
                return(
                        <div className={style.card} key={desert_id} >
                        
                            {/* /VenueServices */}
                                <img src={desert_image} className={style.image}/>
                                
                                <div className={style.eventName}>{desert_name}</div>
                                <div className={style.price}><b>$ {desert_price}</b></div>
                                <div className={style.description}>
                                    <b>Description: </b>{desert_description}
                                </div>
                            
                            <div>
                                <button className={style.btnAdd} 
                                onClick={() => {addStarterItem(value)}}>
                                    Add To List
                                </button>
                            </div>
                        </div>
                );
            })}</> : <LoadingPage/>
        }
        {/* User selected starter */}
        <div style={{"width":"100%"}} >
            {userDessert.length > 0 && <>
            <hr style={{"width":"85%"}}></hr>
                <div className={style.selectTitle}>
                    Your Selected Item
                </div>
                <div className={style.totalAmount}>
                    Total Amount Of Starter : Rs.{dessertTotal}
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
                userDessert.map((value) => {
                    let { desert_id , desert_name, 
                        desert_description , desert_price, desert_image} = value;
                    
                    return(<>
                        <div key={desert_id + desert_name} className={style.singleItem}>
                            <div>
                                <img src={desert_image} className={style.userImage}/>
                            </div>
                            <div className={style.selectRefreshname}>
                                <span>{desert_name}</span>
                            </div>
                            <div className={style.selectQty}>
                                <div>{quantity}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>{desert_price}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>
                                    {quantity * desert_price}
                                </div>
                            </div>
                            <div className={style.button}>
                                <i className={style.removeIcon}
                                    onClick = {() => {removeStarterItem(value)}}
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

export default DessertServices;