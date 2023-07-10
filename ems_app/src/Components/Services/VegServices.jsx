import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserNavBar from '../UserSubComponent/UserNavBar';
import axios from 'axios';
import Swal from "sweetalert2";
import style from '../../Css/VegService.module.css'
import LoadingPage from '../UserSubComponent/LoadingPage';
import {CiCircleRemove} from 'react-icons/ci';


function VegServices() {
    // quantity variable
    const navigate = useNavigate();
    const [mainCourseData,setMainCourseData] = useState([]);
    const [userVegDish,setUserVegDish] = useState([]);
    const [quantity , setQuantity] = useState(0);
    const [vegDishTotal , setVegDishTotal] = useState(0);
    console.log("Total:",vegDishTotal);
   
    

    // adding user starter to list
    const addStarterItem = (value) => {
        if (quantity > 0) {
            console.log(userVegDish.includes(value));
            if (userVegDish.includes(value,0)) {
                console.log("include");
                return;
            }
            console.log("val : ",value);
            setUserVegDish([...userVegDish,value]);
            setVegDishTotal(vegDishTotal + (quantity * value.maincourse_price));
            
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
        console.log("remove",value.maincourse_id);
        if (value.maincourse_id) {
            let newItem = userVegDish.filter((val) => val.maincourse_id !== value.maincourse_id)
            setUserVegDish(newItem);
            setVegDishTotal(vegDishTotal - (quantity * value.maincourse_price));
        }

    }
    //  ******    Fetch starter Data from backend      ***************
    const fetchStarter = async() => {
        axios.get('http://localhost:3001/maincourse')
        .then((respone) => {
            if (respone.data.result) {
                console.log(respone.data.result);
                let mainCourseData = respone.data.result;
                setMainCourseData(mainCourseData
                    .filter((val) => val.maincourse_type === 'VEG' ));


                // setting user starter from store
                if (localStorage.getItem("userVegDish")) {
                    console.log(JSON.parse(localStorage.getItem("userVegDish")));
                    let VegDishDetail = JSON.parse(localStorage.getItem("userVegDish"));
                    setUserVegDish(VegDishDetail);
                    setQuantity(JSON.parse(localStorage.getItem("userVegDishQuantity")));
                    setVegDishTotal(JSON.parse(localStorage.getItem("userVegDishTotal")))
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
        let total = userVegDish.reduce((accumulate,value) => {
            console.log(value.maincourse_price);
            return accumulate + (qty * value.maincourse_price);
        },0)
        //console.log("total",total);
        setVegDishTotal(total);
    }
    // save user starter data locally
    const saveUserStarter = () => {
            if (userVegDish.length>0) {
                Swal.fire({
                    title: 'Do you want to save the info and move?',
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("userVegDish",JSON.stringify(userVegDish));
                        localStorage.setItem("userVegDishQuantity",quantity);
                        localStorage.setItem("userVegDishTotal",vegDishTotal);
                        console.log(JSON.parse(localStorage.getItem("userDessert")));
                        navigate('/NonVegServices');
                    }
                })
                
                
            }
        else{
            navigate('/NonVegServices');
        }
    }

    const previousClicked = () =>{
        console.log("previous");
        if (userVegDish.length > 0) {
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
                        localStorage.setItem("userVegDish",JSON.stringify(userVegDish));
                        localStorage.setItem("userVegDishQuantity",quantity);
                        localStorage.setItem("userVegDishTotal",vegDishTotal);
                        navigate(-1);
                    }
                })
                
                } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("userVegDish");
                        localStorage.removeItem("userVegDishQuantity");
                        localStorage.removeItem("userVegDishTotal");
                        navigate(-1);
                    }
                })
                }
            })
        } else {
            localStorage.removeItem("userVegDish");
            localStorage.removeItem("userVegDishQuantity");
            localStorage.removeItem("userVegDishTotal");
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchStarter();
    },[])
return ( <>
<UserNavBar/>
{mainCourseData.length > 0 ? <div className={style.mainBody}>
    <div className={style.title}> VEG DISHES</div>
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
        mainCourseData.length>0 ? <>{mainCourseData.map((value) =>{
            const {maincourse_id , maincourse_name, maincourse_type,
                maincourse_description , maincourse_price, maincourse_image} = value;
                return(
                        <div className={style.card} key={maincourse_id} >
                        
                            {/* /VenueServices */}
                                <img src={maincourse_image} className={style.image}/>
                                
                                <div className={style.eventName}>{maincourse_name}</div>
                                <div className={style.price}><b>$ {maincourse_price}</b></div>
                                <div className={style.description}>
                                    <b>Description: </b>{maincourse_description}
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
            {userVegDish.length > 0 && <>
            <hr style={{"width":"85%"}}></hr>
                <div className={style.selectTitle}>
                    Your Selected Item
                </div>
                <div className={style.totalAmount}>
                    Total Amount Of Starter : Rs.{vegDishTotal}
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
                userVegDish.map((value) => {
                    let {maincourse_id , maincourse_name, maincourse_type,
                maincourse_description , maincourse_price, maincourse_image} = value;
                    
                    return(<>
                        <div key={maincourse_id + maincourse_name} className={style.singleItem}>
                            <div>
                                <img src={maincourse_image} className={style.userImage}/>
                            </div>
                            <div className={style.selectRefreshname}>
                                <span>{maincourse_name}</span>
                            </div>
                            <div className={style.selectQty}>
                                <div>{quantity}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>{maincourse_price}</div>
                            </div>
                            <div className={style.selectQty}>
                                <div>
                                    {quantity * maincourse_price}
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

export default VegServices;