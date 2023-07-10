import React from 'react';
import style from '../../Css/Loading.module.css'



function LoadingPage() {
return ( <>
<div className={style.mainBody}>
    <div className={style.moduleContainer}>
    <h1 className={style.loadText} style={{"textAlign":"center"}}>
        Loading....
    </h1>

    <div className={style.spinner}></div>

    </div>
</div>
</> );
}

export default LoadingPage;