import React from 'react';
import { Link } from 'react-router-dom';
import TitleBar from '../SubComponents/TitleBar';
import refreshMent from '../../Images/Admin_Image/refresh.jpg';
import starter from '../../Images/Admin_Image/starter.jpg';
import mainCourse from '../../Images/Admin_Image/maincourse.webp';
import dessert from '../../Images/Admin_Image/dessert.jpg';
import style from '../../AdminCss/Menu.module.css';

function AddMenuServices() {
return ( <>
    <TitleBar/>
    <div className={style.mainBody}>
        <div className={style.moduleContainer}>
            <div>
             <Link to='/AddRefreshment' className={style.link}>
                <div >
                    <img src={refreshMent} className={style.image} style={{"borderRadius":"10px"}}/>
                </div>
                <span className={style.moduleName}>ADD REFRESHMENT</span>
              </Link>
            </div>
            <div>
                <Link to='/AddStarter' className={style.link}>
                    <div >
                        <img src={starter} className={style.image} style={{"borderRadius":"10px"}}/>
                    </div>
                    <span className={style.moduleName}>ADD STARTER</span>
                </Link>
            </div>
        </div>

        <div className={style.moduleContainer}>
            <div>
                <Link to='/AddMainCourse' className={style.link}>
                    <div >
                        <img src={mainCourse} className={style.image} style={{"borderRadius":"10px"}} />
                    </div>
                    <span className={style.moduleName}>ADD MAIN COURSE</span>
                </Link>
            </div>
            <div>
                <Link to='/AddDessert' className={style.link}>
                    <div >
                        <img src={dessert} className={style.image} style={{"borderRadius":"10px"}}/>
                    </div>
                    <span className={style.moduleName}>DESSERT</span>
                </Link>
            </div>
        </div>

    </div>
</> );
}

export default AddMenuServices;