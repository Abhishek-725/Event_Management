import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import style from '../../AdminCss/TitleBar.module.css';
import style2 from '../../AdminCss/NavBar.module.css';
function TitleBar() {

return (<>
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
            <div className={style.menu}><NavLink className={style.link} to = '/AdminHomePage' >New Bookings</NavLink></div>
            <div className={style.menu}><NavLink className={style.link} to = '/ViewBookingServices'>View Bookings</NavLink></div>
            <div className={style.menu}><NavLink className={style.link} to = '/AddVenue'>Add Venue</NavLink></div>
            <div className={style.menu}><NavLink className={style.link} to = '/AddMenuservices' >Add Menu</NavLink></div>
            <div className={style.menu}><NavLink className={style.link} to = '/AddEvent'>Add Event</NavLink></div>
            <div className={style.menu}><NavLink className={style.link} to = '/AddDecoration'>Decoration</NavLink></div>
            {/* <div className={style2.menu}><Link className={style.link}>View Payment</Link></div>
            <div className={style2.menu}><Link className={style.link}>Profile</Link></div> */}
        </div>

        </div>
    </div>
</>  );
}

export default TitleBar;