import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form";
import {
  selectLoggedInUser,
  createUserAsync
} from '../authSlice';

import { selectAuth } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';


export default function Signup() {
  // const count = useSelector(selectCount);  
  const count = useSelector(selectAuth);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();
  // const user = useSelector(selectLoggedInUser);

// console.log(errors); 



  return (
    <>
    {user && <Navigate to='/' replace = {true}> </Navigate>}
{user?.email && (
  <span className='flex bg-blue-400 justify-center p-2'>
    <b>User:</b> <span className="ml-2">{user.name} </span> <span className="ml-3"> <b>Created Successfully</b>😊!!</span> <span className="ml-2">with</span> <span className="ml-3"><b>Email:</b><span className="ml-1">  {user.email}</span> </span>
  </span>
)}

      
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-22 w-auto"
          src="https://www.shopland.com.pk/theme/images/logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{  // noValidate is the HTML's validator
          dispatch(createUserAsync({name: data.name,email: data.email, password: data.password}))
          console.log(data)
          reset();  // reset the form
        })}>

<div>
            <label htmlFor='name'  className="block text-sm font-medium leading-6 text-gray-900">
             Name
            </label>
            <div className="mt-2">
              <input
                id="name"
              {...register("name", { required: "Name is required"})}
                type="String"

                className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                  
            </div>
          </div>


          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
              {...register("email", { required: "Email is required", pattern: {value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message:"Enter a Valid Email" } })}
                type="email"

                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                     {errors.email && <p className='text-red-600'>{errors.email.message}</p> }
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", { required: "Password is required", pattern:{value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message: `- at least 8 characters\n
                - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters` } })}
                type="password"
                
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                       {errors.password && <p className='text-red-600'>{errors.password.message}</p> }
            </div>
          </div>
          
          {/* Others */}

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
               Confirm Password
              </label>
             
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                {...register("confirmPassword", { required: "Confirm Password is required", validate: (value, formValues) => value === formValues.password || 'Password Not Match' })}
                type="password"  // Set the type to "password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
                         {errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message}</p> }
            </div>
          </div>

          {/* Others */}


          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a Member?{' '}
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  </>
  );
  
}
