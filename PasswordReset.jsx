import React, { useState } from 'react';
import AuthLayout from './layouts/AuthLayout';
import Input from './Inputs/Input';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosInstance';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const sendLink = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setError('Email is required');
      return;
    }
  
    try {
      const res = await axiosInstance.post("/api/v1/auth/sendpasswordlink", { email }); // Use relative path if axiosInstance has baseURL
  
      if (res.status === 201) {
        setEmail("");
        setMessage(true);
        setError('');
      } else {
        toast.error("Invalid user");
      }
  
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  
    console.log('Sending password reset link to:', email);
  };
  

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-[50px] font-semibold text-black'>Enter Your Email</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Enter your email below, and we’ll send you a link to reset your password.
        </p>

        {message ? <p style={{color:"green", fontWeight:'bold'}}>Password reset link has been sent successfully in your email.</p> : ""}

        <form onSubmit={sendLink}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="yourname@example.com"
            type="email"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>Reset Password</button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default PasswordReset;
