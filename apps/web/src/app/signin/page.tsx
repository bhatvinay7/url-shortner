'use client'
import React from "react";
import {useState} from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { userSignin } from "../../utils/user";
import NotificationBar from "../../components/ui/notification";
import {axiosPublic} from '../../lib/axios'

enum state { 
  SUCCESS="success",
  FAILURE="failure"
}

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn=() => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [response,setResponse]=useState<{message:string|null}>({message:null})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async(data: SignInFormData) => {
   try{
      const response= await userSignin(data)
      setResponse(response)
      setShowSuccess(true)
    }
    catch(error:any){
       setResponse(error.response)
      setShowError(true)
    }
    finally{
      setTimeout(()=>{
        setShowError(false)
        setShowSuccess(false)
      },4000)
    }
  };

  const handleGoogleSignIn = async() => {
      try{
         await axiosPublic.get('auth/google')
      }
      catch(error:any){
        console.log({error:error.message})
      }
  };

  return (
    <div className=" h-[100%] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <NotificationBar
       message={response?.message}
       type={showSuccess? state.SUCCESS:state.FAILURE}
       show={showSuccess?showSuccess:showError}
       onClose={()=>{setResponse({message:null})}}

      />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full h-12 px-4 border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full h-12 px-4 border border-blue-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center justify-center my-6">
          <div className="h-[1px] bg-gray-300 w-1/3"></div>
          <span className="text-gray-500 text-sm mx-3">OR</span>
          <div className="h-[1px] bg-gray-300 w-1/3"></div>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-all"
        >
          <FcGoogle size={22} />
          <span className="text-gray-700 font-medium">
            Sign in with Google
          </span>
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-700 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
