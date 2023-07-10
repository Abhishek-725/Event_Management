import React, { useEffect, useRef, useState } from 'react';
import { Link , NavLink, useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

import style from '../../Css/UserNavBar.module.css';
import {CiViewList} from 'react-icons/ci';
import {AiOutlineHome , AiOutlineLogin} from 'react-icons/ai';
import {FaSearchLocation} from 'react-icons/fa';
import {BiLogOut , BiUserCircle } from "react-icons/bi";
import {FcAbout} from 'react-icons/fc';
import {MdOutlineContactMail} from 'react-icons/md';
import axios from 'axios';
function UserNavBar() {
    const navigate = useNavigate();
    let userInfo;
    if (localStorage.getItem("userData")) {
         userInfo = JSON.parse(localStorage.getItem("userData"));
        //console.log(userInfo.userId);
    }
    // variable to control display of submenu
    const [subMenu , setSubMenu] = useState(false);
    // Login Function
    const loginClicked = () => {
        navigate('/');
    }
    // Logout Function
    const logOut = () => {
        axios.get("http://localhost:3001/users/logOutUser",{
            headers: { access: "jwt" },
            withCredentials: true,
        })
        .then((response) => {
            console.log(response);
            if (response.data == 'Logout Successful') {
                console.log(response.statusText);
                localStorage.clear();
                navigate('/');
                
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                footer: '<a href="">Why do I have this issue?</a>',
              });
        })
       
    }
return ( <>
    <div className={style.mainBody}>
        <div className={style.TitleBar}>
            <div className={style.logoImage}></div>
            <div className={style.title}>
                <span style={{"display":"block"}}>Royal Event Management</span>
                <span style={{"fontSize":"12px","fontWeight":"bold","marginLeft":"18px"}}>
                    All Types Of Event Manage
                </span>
            </div>
            <div className={style.NavBar}>
                <div className={style.menu}>
                    <AiOutlineHome className={style.icon}/>
                    <NavLink className={style.link} to='/HomePage'>Home</NavLink>
                </div>
                <div className={style.menu}>
                    <span><FaSearchLocation className={style.icon}/></span>
                    <NavLink className={style.link} to = '/VenueServices'>Venue</NavLink>
                </div>
                <div className={style.menu}>
                    <span ><CiViewList className={style.icon}/></span>
                    <NavLink className={style.link} to = '/Status'>View Status</NavLink>
                </div>
                <div className={style.menu}>
                    <span ><FcAbout className={style.icon}/></span>
                    <NavLink className={style.link} to = '/About'>About</NavLink>
                </div>
                <div className={style.menu}>
                    <span ><MdOutlineContactMail className={style.icon}/></span>
                    <NavLink className={style.link} to = '/ContactUS'>Contact Us</NavLink>
                </div>
                {/* <div className={style.menu}><Link className={style.link}>View Payment</Link></div>
                <div className={style.menu}><Link className={style.link}>Profile</Link></div> */}
                {/* User Profile */}
                <div className={style.userProfile}>
                    <div onClick={()=>{setSubMenu(!subMenu)}}
                        className={style.userLogo}
                    >
                        { userInfo ? <span>{userInfo.firstName[0]}</span>:
                                    <span><BiUserCircle/></span>}
                    </div>

                    {subMenu &&
                        <ul>
                        <div className={style.subMenu}>
                            { userInfo ?
                            <>
                                <div style={{"paddingTop":"2px"}}>{userInfo.email}</div>
                                <div onClick={logOut}
                                    style={{"cursor":"pointer","paddingBottom":"2px","width":"60%"}}>
                                    <span style={{"display":"block","cursor":"pointer"}}>
                                        <BiLogOut style={{"alignItems":"center","paddingTop":"2px","position":"absolute"}}/>
                                    </span>
                                    <span style={{"marginLeft":"20px","cursor":"pointer"}}>Logout</span>
                                </div>
                            </> :
                            <>
                                <div onClick={loginClicked}
                                    style={{"cursor":"pointer","paddingBottom":"2px","width":"60%"}}>
                                    <span style={{"display":"block","cursor":"pointer"}}>
                                        <AiOutlineLogin 
                                        style={{"alignItems":"center","paddingTop":"2px",
                                                "position":"absolute"}}/>
                                    </span>
                                    <span style={{"marginLeft":"20px","cursor":"pointer"}}>
                                        Login
                                    </span>
                                </div>
                            </>
                            }
                            
                        </div>
                        </ul>}
                </div> 

            </div>

        </div>
    </div>
</> );
}

export default UserNavBar;