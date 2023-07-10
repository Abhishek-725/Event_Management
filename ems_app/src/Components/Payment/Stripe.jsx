import React from 'react';
import axios from 'axios';
import style from '../../Css/Stripe.module.css'
import UserNavBar from '../UserSubComponent/UserNavBar';
import Google from './Google';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
//
function Stripe(props) {
    const [amount,setAmount] = useState();
    const location = useLocation();

    const handlePayment = () => {
        if (location.state) {
            let {amount , eventDetails} = location.state;
            setAmount(amount);
           
            let eventDetail = eventDetails[0];
            console.log(eventDetails[0]);
            axios.post("http://localhost:3001/stripe/create-checkout-session",{amount,eventDetail})
                    .then((response) => {
                        if (response.data) {
                            console.log(response.data);
                            window.location.href = response.data;
                            
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            
        }

    }
return ( <>
<UserNavBar/>
    <div>
    <div className={style.PaymentButton}>
        <button  onClick={handlePayment}>
            Proceed with Card
        </button>         
    </div>
    <div className={style.googleButton}>
        <Google/>
    </div>
        
    </div>
</> );
}

export default Stripe;