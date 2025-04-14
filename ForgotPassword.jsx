import React, { useEffect, useState } from 'react'
import AuthLayout from './layouts/AuthLayout'
import Input from './Inputs/Input'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

const ForgotPassword = () => {

  const {id, token} = useParams();

  const history = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const userValid = async() => {
    const res = await fetch(`http://localhost:8000/api/v1/auth/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    

    const data = await res.json();

    if(data.status == 201){
      console.log("User valid")
    }else{
        history("*");
    }
  }


  const sendpassword = async(e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/api/v1/auth/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({password})
    });

    const data = await res.json();

    if(data.status == 201){
        setPassword("");
        setMessage(true);
    }else{
        toast.error("! Token expired generate new link")
    }

  }

  useEffect(() => {
    userValid();
  }, []);

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-[40px] font-semibold text-black'>Create new password</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your new password below to reset your account.
        </p>

        <form onSubmit={sendpassword}>
        {message ? <p style={{color:"green", fontWeight:'bold'}}>Password successfully created.</p> : ""}
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="New password"
            placeholder=""
            type="password"
          />


          <button type='submit' className='btn-primary'>Create Password</button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword