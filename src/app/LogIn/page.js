"use client"; // Add this line at the top
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import {signIn, useSession} from "next-auth/react"

export default function Login() {
    const [error, setError] = useState("");
    const router = useRouter();
    const session = useSession()

    useEffect(() => {
        if(session?.status === "authenticated"){
        router.replace("/dashBoard")
        }
    },[session,router])

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const email = e.target[0].value;  // Assuming email is the first input field
        const password = e.target[1].value;  // Assuming password is the second input field
      
        // Clear previous errors before making the sign-in request
        setError(""); 
      
        const res = await signIn("credentials", {
          redirect: false,  // Prevent automatic redirection
          email,
          password,
        });
      
        if (res?.error) {
          // If there's an error, display the error message
          setError(`Login failed: ${res.error}`);
        } else {
          // Clear errors and navigate to the dashboard on successful Login
          setError("");
          router.replace("/dashBoard");  // Ensure the path is exactly "/dashboard"
        }
      };
      

  

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
            
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-300 to-gray-600 p-6 rounded-lg shadow-xl max-w-sm mx-auto space-y-4 border border-gray-400">
            <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2 text-lg text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-2 text-lg text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <button type="submit"className="w-full py-2 text-lg font-bold text-white bg-gray-700 rounded-md hover:bg-gray-800 shadow-xl transition-transform transform hover:scale-105">
                    Submit
                </button>
                <p className="text-red-500">{error && error}</p>

                <Link href="/createAccount">Register</Link>
            </form>
            
        </div>
  );
}


