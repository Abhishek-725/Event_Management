import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserNavBar from '../UserSubComponent/UserNavBar';
import refreshMent from '../../Images/Admin_Image/refresh.jpg';
import starter from '../../Images/Admin_Image/starter.jpg';
import mainCourse from '../../Images/FirstPageImage/userMainCourse.webp';
import dessert from '../../Images/Admin_Image/dessert.jpg';
import style from '../../Css/MenuServices.module.css';



function MenuServices() {
    const [subMainCourse,setSubMainCourse] = useState(false);
return ( <>
    <UserNavBar/>
    <div className={style.mainBody}>
        <div className={style.moduleContainer}>
            <div>
             <Link to='/RefreshmentServices' className={style.link}>
                <div >
                    <img src={refreshMent} className={style.image} style={{"borderRadius":"10px"}}/>
                </div>
                <span className={style.moduleName}>REFRESHMENT</span>
              </Link>
            </div>
            <div>
                <Link to='/StarterServices' className={style.link}>
                    <div >
                        <img src={starter} className={style.image} style={{"borderRadius":"10px"}}/>
                    </div>
                    <span className={style.moduleName}>STARTER</span>
                </Link>
            </div>
        </div>

        <div className={style.moduleContainer}>
            <div onClick={() => {setSubMainCourse(!subMainCourse)}} style={{"cursor":"pointer"}}>
                    <div >
                        <img src={mainCourse} className={style.image} style={{"borderRadius":"10px"}} />
                    </div>
                    <span className={style.moduleName}> MAIN COURSE</span>

                {/* subMain Course */}
                {subMainCourse && <div className={style.subMainCourse}>
                    <Link to = '/VegServices'>
                        <div className={style.vegItem}>
                            <h3 style={{"textAlign":"center","paddingTop":"18%"}}>
                                VEG
                            </h3>
                        </div>
                    </Link>
                    <Link to = '/NonVegServices'>
                        <div className={style.nonVegItem}>
                            <h3 style={{"textAlign":"center","paddingTop":"18%"}}>
                                NON VEG
                            </h3>
                        </div>
                    </Link>
                </div>}
            </div>
            <div>
                <Link to='/DessertServices' className={style.link}>
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

export default MenuServices;