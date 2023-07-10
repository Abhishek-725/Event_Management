import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserNavBar from '../UserSubComponent/UserNavBar';
import axios from 'axios';
import Swal from "sweetalert2";
import style from '../../Css/VegService.module.css'
import LoadingPage from '../UserSubComponent/LoadingPage';
import {CiCircleRemove} from 'react-icons/ci';


function NonVegServices() {
    // quantity variable
    const navigate = useNavigate();
    const [mainCourseData,setMainCourseData] = useState([]);
    const [userNonVegDish,setUserNonVegDish] = useState([]);
    const [quantity , setQuantity] = useState(0);
    const [nonVegDishTotal , setNonVegDishTotal] = useState(0);
    console.log("Total:",nonVegDishTotal);
   
    

    // adding user starter to list
    const addStarterItem = (value) => {
        if (quantity > 0) {
            console.log(userNonVegDish.includes(value));
            if (userNonVegDish.includes(value,0)) {
                console.log("include");
                return;
            }
            console.log("val : ",value);
            setUserNonVegDish([...userNonVegDish,value]);
            setNonVegDishTotal(nonVegDishTotal + (quantity * value.maincourse_price));
            
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
            let newItem = userNonVegDish.filter((val) => val.maincourse_id !== value.maincourse_id)
            setUserNonVegDish(newItem);
            setNonVegDishTotal(nonVegDishTotal - (quantity * value.maincourse_price));
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
                    .filter((val) => val.maincourse_type === 'NON-VEG' ));


                // setting user starter from store
                if (localStorage.getItem("userNonVegDish")) {
                    console.log(JSON.parse(localStorage.getItem("userNonVegDish")));
                    let nonVegDishDetail = JSON.parse(localStorage.getItem("userNonVegDish"));
                    setUserNonVegDish(nonVegDishDetail);
                    setQuantity(JSON.parse(localStorage.getItem("userNonVegDishQuantity")));
                    setNonVegDishTotal(JSON.parse(localStorage.getItem("userNonVegDishTotal")))
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
        let total = userNonVegDish.reduce((accumulate,value) => {
            console.log(value.maincourse_price);
            return accumulate + (qty * value.maincourse_price);
        },0)
        //console.log("total",total);
        setNonVegDishTotal(total);
    }
    // save user starter data locally
    const saveUserStarter = () => {
            if (userNonVegDish.length>0) {
                Swal.fire({
                    title: 'Do you want to save the info and move?',
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem("userNonVegDish",JSON.stringify(userNonVegDish));
                        localStorage.setItem("userNonVegDishQuantity",quantity);
                        localStorage.setItem("userNonVegDishTotal",nonVegDishTotal);
                        console.log(JSON.parse(localStorage.getItem("userNonVegDish")));
                        navigate('/DessertServices');
                    }
                })
                
                
            }
        else{
            navigate('/DessertServices');
        }
    }

    const previousClicked = () =>{
        console.log("previous");
        if (userNonVegDish.length > 0) {
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
                        localStorage.setItem("userNonVegDish",JSON.stringify(userNonVegDish));
                        localStorage.setItem("userNonVegDishQuantity",quantity);
                        localStorage.setItem("userNonVegDishTotal",nonVegDishTotal);
                        navigate(-1);
                    }
                })
                
                } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
                .then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("userNonVegDish");
                        localStorage.removeItem("userNonVegDishQuantity");
                        localStorage.removeItem("userNonVegDishTotal");
                        navigate(-1);
                    }
                })
                }
            })
        } else {
            localStorage.removeItem("userNonVegDish");
            localStorage.removeItem("userNonVegDishQuantity");
            localStorage.removeItem("userNonVegDishTotal");
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchStarter();
    },[])
return ( <>
<UserNavBar/>
{mainCourseData.length > 0 ? <div className={style.mainBody}>
    <div className={style.title}> NON-VEG DISHES</div>
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
            {userNonVegDish.length > 0 && <>
            <hr style={{"width":"85%"}}></hr>
                <div className={style.selectTitle}>
                    Your Selected Item
                </div>
                <div className={style.totalAmount}>
                    Total Amount Of Starter : Rs.{nonVegDishTotal}
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
                userNonVegDish.map((value) => {
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

export default NonVegServices;