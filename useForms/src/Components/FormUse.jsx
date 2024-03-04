import React, { useState } from 'react';
import {useForm} from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormUse = () => {
  
    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful,isSubmitted},watch} =useForm()
    // console.log(watch())
    console.log("isSubmitSuccessful: ",isSubmitSuccessful);

    const FormSubmitHandler =(data)=>{
        toast("Form submitted",{theme:"dark"})
        console.log("data: ",data);
    }

  return (
    <div className='form-container'>
      <ToastContainer />
      <fieldset id='legend'>
        <legend>Fill this form</legend>
        <form onSubmit={handleSubmit(FormSubmitHandler)}>
            {isSubmitSuccessful && <div className='success'>
              <p id="successMsg">Registration Successful</p>
            </div>}

          <label> First Name:</label>
          <input type="text" name='firstName' placeholder='First Name' {...register("firstName",{required : "Enter First Name"})} />
          {/* {errors.firstName && <p className='err'>{errors.firstName.message}</p>} */}
          <p className='err'>{errors.firstName?.message}</p>

          <label> Last Name:</label>
          <input type="text" name='lastName' placeholder='Last Name' {...register("lastName",{required : "Enter Last Name"})}/>
          <p className='err'>{errors.lastName?.message}</p>

          <label> Email:</label>
          <input type="email" name='email' placeholder='email' {...register("email", {required:"Enter Email",pattern:{
            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message:"Invalid Email"
          }})}/>
          <p className='err'>{errors.email?.message}</p>

          <label> Password:</label>
          <input type="password" name='password' placeholder='password' {...register("password" , {required:"Enter Password", minLength:{
            value:5,
            message:"Password must be more than 4 characters"
          },maxLength:{
            value:21,
            message:"Password cannot be more than 20 characters"
          },pattern:{
            value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
            message:"Password must contain atleast 1 lowercase letter, 1 uppercase letter , 1 digit and 1 special character"
          }})}/>
           <p className='err'>{errors.password?.message}</p>
        <button onClick={()=>{
            reset()
        }}>Reset</button>
          <input type="submit" value={"Register"} />
        </form>
      </fieldset>
    </div>
  );
};

export default FormUse;