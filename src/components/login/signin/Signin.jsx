import React from 'react';
import { Button, Input } from '../../index';
import { Link, useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import {ToastContainer, toast} from 'react-toastify';
import authService from '../../../connection/auth';
import { useDispatch } from 'react-redux';
import {login} from "../../../store/authslice"
import { ArrowRight } from 'lucide-react'

function Signin() {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();


  const login = async (data) => {
    
    try {
      const userData = await authService.login(data);
      if(userData){
        dispatch(login(userData));
        toast.success("Login Success");
      }
    } catch (error) {
      toast.error(error.message);
    }

  }



  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          SignIn to your Account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don't have an account?
          <Link 
              to = '/signup'
              className='font-medium text-black transition-all duration-200 hover:underline'
            >Sign Up</Link>
        </p>
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <Input 
          label="Email"
          placeholder="Email"
          type="email"
          {...register("email", {
              required: true,
              validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
          })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
                required: true,
            })}
            />
          <Button className="mt-3" type="submit">
            Login <ArrowRight className="ml-2" size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signin;