"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { userSignin } from "../../utils/api/user";
import NotificationBar from "../../components/ui/notification";
enum state {
  SUCCESS = "success",
  FAILURE = "failure",
}
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [response, setResponse] = useState<{ message: string | null }>({
    message: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });


  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await userSignin(data);
      setResponse(response);
      setShowSuccess(true);
    } catch (error: any) {
      setResponse(error.response);
      setShowError(true);
    } finally {
      setTimeout(() => {
        setShowError(false);
        setShowSuccess(false);
      }, 4000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/api/auth/googleAuth`;
    } catch (error: any) {
      console.log({ error: error.message });
    }
  };

  return (
    <div className=" h-[100%] flex items-center flex-col justify-center bg-[hsl(240,5%,65%)] ">
      <NotificationBar
        message={response?.message}
        type={showSuccess ? state.SUCCESS : state.FAILURE}
        show={showSuccess ? showSuccess : showError}
        onClose={() => {
          setResponse({ message: null });
        }}
      />
      <div className=" h-80 flex justify-center flex-col border border-white/12 rounded-sm p-8 w-full max-w-md ">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[hsl(212,90%,45%)] mb-2">
            Shortly
          </h1>
          <p className="text-[hsl(220,10%,45%)]">
            Shorten, manage, and share your links with ease.
          </p>
        </header>

        {/* Google Sign In Button */}
        <div className=" w-full flex justify-center items-center">
        <button
          onClick={()=>handleGoogleSignIn()}
          className="w-3/4 h-12 border bg-[hsl(240,2%,67%)] border-gray-300 rounded-full flex items-center justify-center gap-3 hover:bg-gray-300 transition-all"
        >
          <FcGoogle size={22} />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
