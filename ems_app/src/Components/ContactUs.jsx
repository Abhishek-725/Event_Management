import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import UserNavBar from './UserSubComponent/UserNavBar';
import {ImLocation2 , ImMail} from 'react-icons/im';
import {AiFillPhone} from 'react-icons/ai';
import style from '../Css/ContactUs.module.css'

function ContactUs() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // Send Message at backend
    const sendMessage = (data) => {
        console.log(data);
        if (data) {
            axios.post("http://localhost:3001/contactUs/sendMail",{data})
            .then((response) => {
                console.log(response.data);
                if (response.data.Message === 'Success') {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Message Sent Successfully!",
                        showConfirmButton: true,
                      })
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }
return ( <>
<UserNavBar/>
<div className={style.mainBody}>
    <div className={style.mainContainer}>

        <div className={style.container}>
            <div className={style.content}>
            <div className={style.leftSide}>
                <div className={style.details}>
                {/* class="address details" */}
                    <i><ImLocation2/></i>
                    <div className={style.topic}   class="topic">Address</div>
                    <div className={style.textOne} class="text-one">Surkhet, NP12</div>
                    <div className={style.textTwo} class="text-two">Birendranagar 06</div>
                </div>
                <div className={style.details}>
                    <i><AiFillPhone/></i>
                    <div className={style.topic}>Phone</div>
                    <div className={style.textOne}>+0098 9893 5647</div>
                    <div className={style.textTwo}>+0096 3434 5678</div>
                </div>
                <div className={style.details}>
                    <i><ImMail/></i>
                    <div className={style.topic}>Email</div>
                    <div className={style.textOne}>codinglab@gmail.com</div>
                    <div className={style.textTwo}>info.codinglab@gmail.com</div>
                </div>
            </div>

            <div className={style.rightSide}>
            {/* class="right-side" */}
                <div className={style.topicText}>Send us a message</div>
                <p>If you have any work from us or any types of quries related to event, you can send us message from here. It's our pleasure to help you.</p>
                {/* Form For Message */}
            <form 
                onSubmit={handleSubmit(sendMessage)}>
                {/* ***********  Name Field     *********** */}
                {errors.name&& (
                <span className={style.errorMsg}>*{errors.name.message}</span>
                )}
                <div  className={style.inputBox}>
                    <input type="text" placeholder="Enter your name"
                        {...register("name", {
                            required: { value: true, message: "Name is Required!" },
                            pattern: {  value: /^([\w]{2,})+\s+([\w\s]{2,})+$|^[A-Za-z]+[A-Za-z]$/i,
                                        message: "Invalid Name!",
                                    },
                        })}
                    />
                </div>
                {/* **********     Email Field        ************ */}
                {errors.email && (
                <span className={style.errorMsg}>*{errors.email.message}</span>
                )}
                <div className={style.inputBox}>
                    <input type="email" placeholder="Enter your email"
                        {...register("email", {
                            required: { value: true, message: "Email is Required!" },
                            pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invald E-Mail!",
                                    }
                        })}
                    />
                </div>
                {/* Subject Field */}
                {errors.subject && (
                    <span className={style.errorMsg}>*{errors.subject.message}</span>
                )}
                <div className={style.inputBox}>
                    <input type="text" placeholder="Write the subject.."
                        {...register("subject", {
                            required: { value: true, message: "subject is Required!" },
                        })}
                    />
                </div>

                {/* Message textArea */}
                {errors.message && (
                    <span className={style.errorMsg}>*{errors.message.message}</span>
                )}
                <div className={style.inputBox} style={{"minHeight":"110px"}}>
                    <textarea 
                        placeholder="Enter your message...."
                        {...register("message",{
                            required:{
                                value:true,
                                message:"Message Required!"
                                },
                                pattern: {
                                    value: /^([\w]{2,})+\s+([\w\s]{2,})+$|^[A-Za-z]+[A-Za-z]$/i,
                                    message: "Invalid Message!",
                                }
                        })}
                    />
                </div>
                <div className={style.button}>
                    <input type="submit" value="Send Now" />
                </div>
            </form>
            </div>
            </div>
        </div>



    </div>
</div>
</> );
}

export default ContactUs;