import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserNavBar from '../UserSubComponent/UserNavBar';
import axios from 'axios';
import Swal from "sweetalert2";
import style from '../../Css/Refrehment.module.css'
import LoadingPage from '../UserSubComponent/LoadingPage';
import {CiCircleRemove} from 'react-icons/ci';

function RefreshmentServices() {
    // quantity variable
    const navigate = useNavigate();
    const [refreshMentData,setRefreshMentData] = useState([]);
    const [userRefreshMent,setUserRefreshMent] = useState([]);
    const [quantity , setQuantity] = useState(0);
    const [refreshMentTotal , setRefreshMentTotal] = useState(0);
    console.log("Total:",refreshMentTotal);
    

    // adding user refreshment to list
    const addRefreshmentItem = (value) => {
        if (quantity > 0) {
            let details = userRefreshMent;
            if (details.includes(value)) {
                return;
            }
            setUserRefreshMent([...userRefreshMent,value]);
            setRefreshMentTotal(refreshMentTotal + (quantity * value.refreshMent_price));
            // console.log(userRefreshMent);
        } else {
            Swal.fire({
                position: "top",
                icon: "info",
                title: "Please enter number of person",
                showConfirmButton: true,
            })
        }
    }
    console.log("quantity",quantity);
    console.log("total",refreshMentTotal);
    // ******       remove user refreshment to list       ***************
    const removeRefreshmentItem = (value) =>{
        console.log("remove",value.refreshMent_id);
        if (value.refreshMent_id) {
            let newItem = userRefreshMent.filter((val) => val.refreshMent_id !== value.refreshMent_id)
            setUserRefreshMent(newItem);
            setRefreshMentTotal(refreshMentTotal - (quantity* value.refreshMent_price));
        }

    }
    //  ******    Fetch refreshMent Data from backend      ***************
    const fetchRefreshMent = async() => {
        axios.get('http://localhost:3001/refreshMent')
        .then((respone) => {
            if (respone.data.result) {
                console.log(respone.data.result);
                setRefreshMentData(respone.data.result);
                // setting user refreshment from store
                if (localStorage.getItem("userRefreshMent")) {
                    console.log(JSON.parse(localStorage.getItem("userRefreshMent")));
                    let refreshMentDetail = JSON.parse(localStorage.getItem("userRefreshMent"));
                    setUserRefreshMent(refreshMentDetail);
                    setQuantity(JSON.parse(localStorage.getItem("refrehMentQuantity")));
                    setRefreshMentTotal(JSON.parse(localStorage.getItem("refrehMentTotal")) );
                    //console.log(userRefreshMent);
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
        let total = userRefreshMent.reduce((accumulate,value) => {
            console.log(value.refreshMent_price);
            return accumulate + (qty* value.refreshMent_price);
        },0)
        //console.log("total",total);
        setRefreshMentTotal(total);
    }
    // save user refreshMent data locally
    const saveUserRefresh = () => {
        if (userRefreshMent.length > 0) {
            if (userRefreshMent.length>0) {
                Swal.fire({
                    title: 'Do you want to save the info and move?',
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("userRefreshMent",JSON.stringify(userRefreshMent));
                        localStorage.setItem("refrehMentQuantity",quantity);
                        localStorage.setItem("refrehMentTotal",refreshMentTotal);
                        console.log(JSON.parse(localStorage.getItem("userRefreshMent")));
                        navigate('/StarterServices');
                    }
                })   
            }

        }
        else{navigate('/StarterServices');}
    }

    const previousClicked = () =>{
        console.log("previous");
        if (userRefreshMent.length > 0) {
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
                        localStorage.setItem("userRefreshMent",JSON.stringify(userRefreshMent));
                        localStorage.setItem("refrehMentQuantity",quantity);
                        localStorage.setItem("refrehMentTotal",refreshMentTotal);
                        navigate(-1);
                    }
                })
                
                } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("userRefreshMent");
                        localStorage.removeItem("refrehMentQuantity");
                        localStorage.removeItem("refrehMentTotal");
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
        fetchRefreshMent();
    },[])
return ( <>
<UserNavBar/>
{refreshMentData.length > 0 ?<div className={style.mainBody}>
    <div className={style.title}> REFRESHMENT</div>
    <div className={style.quantity}>
        <label><b>Plaese enter number of person/glass : </b></label>
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
        refreshMentData.length>0 ? <>{refreshMentData.map((value) =>{
            const { refreshMent_id , refreshMent_name , 
                    refreshMent_description , refreshMent_price, refreshMent_image} = value;
                return(
                        <div className={style.card} key={refreshMent_id} >
                            <Link to='' state={{"userRefrehMentData":value}}>
                            {/* /VenueServices */}
                                <img src={refreshMent_image} className={style.image}/>
                                
                                <div className={style.eventName}>{refreshMent_name}</div>
                                <div className={style.price}><b>$ {refreshMent_price}</b></div>
                                <div className={style.description}>
                                    <b>Description: </b>{refreshMent_description}
                                </div>
                            </Link>
                            <div>
                                <button className={style.btnAdd} 
                                onClick={() => {addRefreshmentItem(value)}}>
                                    Add To List
                                </button>
                            </div>
                        </div>
                );
            })}</> : <LoadingPage/>
        }
        {/* User selected RefreshMent */}
        <div style={{"width":"100%"}} >
            {userRefreshMent.length > 0 && <>
            <hr style={{"width":"85%"}}></hr>
                <div className={style.selectTitle}>
                    Your Selected Item
                </div>
                <div className={style.totalAmount}>
                    Total Amount Of RefreshMent : Rs.{refreshMentTotal}
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
                userRefreshMent.map((value) => {
                    let {refreshMent_id,
                        refreshMent_image,refreshMent_name,refreshMent_price} = value;
                    
                    return(<>
                        <div key={refreshMent_id + refreshMent_name} className={style.singleItem}>
                            <div>
                                <img src={refreshMent_image} className={style.userImage}/>
                            </div>
                            <div className={style.selectRefreshname}>
                                <span>{refreshMent_name}</span>
                            </div>
                            <div className={style.selectQty}>
                                <div>{quantity}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>{refreshMent_price}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>
                                    {quantity * refreshMent_price}
                                </div>
                            </div>
                            <div className={style.button}>
                                <i className={style.removeIcon}
                                    onClick = {() => {removeRefreshmentItem(value)}}
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
        <div className={style.back_next}>
            <span className={style.previous} onClick = {previousClicked}>
                &laquo; Previous
            </span>
            <span className={style.next} onClick = {saveUserRefresh}>
                Next &raquo;
            </span>
        </div>


    </div>

</div> : <LoadingPage/>}
</> );
}

export default RefreshmentServices;