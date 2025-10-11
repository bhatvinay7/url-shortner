'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPopup() {
  const [open, setOpen] = useState(true);

  const handleGoogleSignIn = () => {
    try{
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/googleAuth`;
    }
    catch(error:any){
        console.log(error)
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[hsla(212,90%,45%,1)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[hsl(212,90%,40%)] transition"
      >
        Sign In
      </button>

      {/* Popup Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex items-center  justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[hsl(240,7%,82%)] text-[hsl(220,15%,20%)] rounded-2xl shadow-xl p-8 w-[90%] max-w-xl flex flex-col items-center gap-5 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              {/* Close Button */}
              {/* <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-[hsl(220,15%,40%)] hover:text-[hsl(212,90%,45%)] text-lg"
              >
                ✕
              </button> */}

              {/* Heading */}
              <h2 className="text-2xl font-bold text-[hsl(212,90%,45%)]">
                Welcome Back 👋
              </h2>
              <p className="text-[hsl(220,10%,40%)] text-center">
                Sign in to continue to your dashboard and manage your links.
              </p>

              {/* Google Sign-In */}
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center w-4/5 md:w-3/4 justify-center gap-3 bg-[#c8cbbb] border border-[hsl(220,15%,80%)] hover:border-[hsl(212,54%,74%)] rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all text-[hsl(220,20%,20%)] font-medium"
              >
                <FcGoogle size={22} />
                Continue with Google
              </button>

              <div className="text-sm text-[hsl(220,10%,50%)] mt-4">
                By signing in, you agree to our{' '}
                <a href="#" className="text-[hsl(212,90%,45%)] underline">
                  Terms
                </a>{' '}
                &{' '}
                <a href="#" className="text-[hsl(212,90%,45%)] underline">
                  Privacy Policy
                </a>.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
