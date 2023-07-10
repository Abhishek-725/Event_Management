import React from 'react';
import { Link } from 'react-router-dom';

import style from '../../AdminCss/NavBar.module.css';
function NavBar() {
    
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
                <div className={style.menu}><Link className={style.link}>New Bookings</Link></div>
                <div className={style.menu}><Link className={style.link}>View Bookings</Link></div>
                <div className={style.menu}><Link className={style.link}>Add Venue</Link></div>
                <div className={style.menu}><Link className={style.link}>New Menu</Link></div>
                <div className={style.menu}><Link className={style.link}>Add Event</Link></div>
                <div className={style.menu}><Link className={style.link}>Decoration</Link></div>
            </div>
        </div>
    </div>
</> )
}

export default NavBar;