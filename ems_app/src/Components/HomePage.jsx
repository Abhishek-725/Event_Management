import React, { useState } from 'react';
import UserNavBar from './UserSubComponent/UserNavBar';
import fullEventImage from '../Images/FirstPageImage/fullEvent.png';
import decorationImage from '../Images/FirstPageImage/decoration.png';
import foodImage from '../Images/FirstPageImage/food.png';
import waterSupplyImage from '../Images/FirstPageImage/waterSupply.png';
import style from '../Css/HomePage.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {
    const location = useLocation();
    // setting user Data locally
        if (location.state) {
            const userData = location.state;
            console.log(userData.userId);
            localStorage.setItem("userData",JSON.stringify(userData));
            console.log(JSON.parse(localStorage.getItem("userData")));
        }

    
    
return ( <>
    <UserNavBar/>
    <div className={style.mainBody}>
        <div className={style.moduleContainer}>
            <div>
             <Link to='/EventServices' className={style.link}>
                <div >
                    <img src={fullEventImage} className={style.image} />
                </div>
                <span className={style.moduleName}>FULL EVENT MANAGEMENT</span>
              </Link>
            </div>
            <div>
                <Link to='/EventServices' className={style.link}>
                    <div >
                        <img src={decorationImage} className={style.image}/>
                    </div>
                    <span className={style.moduleName}>DECORATION</span>
                </Link>
            </div>
        </div>

        <div className={style.moduleContainer}>
            <div>
                <Link to='/MenuServices' className={style.link}>
                    <div >
                        <img src={foodImage} className={style.image} />
                    </div>
                    <span className={style.moduleName}>CATERING SERVICE</span>
                </Link>
            </div>
            <div>
                <Link to='' className={style.link}>
                    <div >
                        <img src={waterSupplyImage} className={style.image}/>
                    </div>
                    <span className={style.moduleName}>WATER SUPPLY</span>
                </Link>
            </div>
        </div>

            {/* NGO Service */}
            <div>
                <span className={style.ngoText}>
                    <a href = 'https://www.google.com/search?q=ngo+near+me+to+donate+food&rlz=1C1UEAD_enIN1017IN1017&ei=6IkNZMWaLbeH4-EPh8OdoAs&oq=ngo+near+me+for+food&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgYIABAWEB4yBQgAEIYDMgUIABCGAzIFCAAQhgM6CggAEEcQ1gQQsAM6BwgAELADEEM6DQguEMcBENEDELADEEM6BQgAEIAESgQIQRgAUJMHWIRHYLFlaAFwAHgAgAHdAYgB5A2SAQUwLjUuNJgBAKABAcgBCsABAQ&sclient=gws-wiz-serp' target={'_blank'}>
                        NGO SERVICE
                    </a>

                </span>
                <span className={style.ngoNote}>
                    <b>Note :</b> 
                        Do not waste food,lets try to feed the needy people by 
                        using NGO service and donating
                        them the needful things and Food.
                </span>
            </div>
    </div>
</> );
}

export default HomePage;