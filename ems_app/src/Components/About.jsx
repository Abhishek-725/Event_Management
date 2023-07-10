import React from 'react';
import UserNavBar from './UserSubComponent/UserNavBar';
import royalEventImg from '../Images/Admin_Image/RoyalLogo.png'
import style from '../Css/About.module.css'
function About() {
return ( <>
<UserNavBar/>
<div className={style.mainBody}>   
    <div className={style.mainContainer}>
    {/* <!-- About Section --> */}
    <div className={style.aboutSection}>
        <div className={style.imgContainer}>
            <img src={royalEventImg} className={style.logoImg} alt="Table Setting" />
        </div>
        
        <div className={style.detailContainer}>
        <h1 style={{"textAlign":"center"}}>About Royal Event Management</h1>
        <h5 style={{"textAlign":"center"}}>Tradition since 1920</h5>
        <p className={style.firstPara}>
            Welcome to Royal Event Management Our main goal is to always achieve a 
            high level of customer satisfaction with the services and products that we
            provide. We manage Business party, Wedding arrangements, Dance & music 
            arrangement. 
            <p style={{"color":"gray"}}> 
                We’re thrilled you’ve decided to visit us.
            </p> 
        </p>
        <p className={style.secondPara}>
        Royal Event Management has  been known for an unparalleled commitment 
        to customer satisfaction. It’s this standard of excellence that has 
        provided the impetus for us to grow into the business we are today. 
        For more information about the products and services we provide, reach 
        out our site for more details.                              
        </p>
        </div>
    </div>


    </div>

</div>
</>  );
}

export default About;