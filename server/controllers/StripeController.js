const bcrypt  = require('bcrypt');
const db = require('../models/index');
const payment = db.payments;
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51MrbuhSIuXSogDMQHiEQLkfMnXLTwZ52xoTvn6756zal2CgTLtV76TAsfGAg3EzCa03lxJnNuW1SU5RBPzVLCwnn00LC0ZAlRR');
//sk_test_51MrbuhSIuXSogDMQHiEQLkfMnXLTwZ52xoTvn6756zal2CgTLtV76TAsfGAg3EzCa03lxJnNuW1SU5RBPzVLCwnn00LC0ZAlRR
//pk_test_51MrbuhSIuXSogDMQfKfkbtwYkowlHbYvhVcNHdFCLJzeGgIFonJ0GGJy44fMBZ8QVMWxjRaeKPDQGtC9BCTU48HQ00vACznAbh
exports.checkOut = async (req,res) => {
    let balance;
    console.log(req.body);
    let {amount, eventDetail} = req.body;
    let { event_id,event_name,user_id,user_name,event_total} = eventDetail;
   console.log("id",event_id);
   balance = event_total - amount;
   
   try {
    const response = await payment.create({event_id :event_id ,
        user_id: user_id , user_name:user_name ,
        paid_amount:amount ,balance_amount: balance,total_amount:event_total});
        console.log(response);
   } catch (error) {
    console.log(error);
   }
 
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
            {
                price_data: {
                currency: 'INR',
                product_data: {
                    name: `Event Type is : ${event_name}`,
                },
                unit_amount: amount * 100,
                },
                quantity: 1,
            },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/HomePage',
            cancel_url: 'http://localhost:4242/cancel',
        });
        console.log(session.url);
        res.status(200).send(session.url);;
    } catch (error) {
        console.log("Stripe Error : ",error);
    }

}

