"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function CreateAccount() {
    const [error, setError] = useState("");
    const router = useRouter();

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        if (!isValidEmail(email)) {
            setError("Invalid email address.");
            return;
        }

        if (!password || password.length < 8) {  // Fix password length check
            setError("Password must be at least 8 characters.");
            return;
        }
    

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, // Include name in the body
                    email,
                    password,
                }),
            });

            if (res.status === 400) {
                setError("This email is already registered")
            }if(res.status === 200){
                setError("");
                router.push("/Login");
            }
        } catch (error) {
            setError("An error occurred.");
            console.log(error)
        }
    }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-300 to-gray-600 p-6 rounded-lg shadow-xl max-w-sm mx-auto space-y-4 border border-gray-400">
            <h1>Register</h1>
            <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full px-4 py-2 text-lg text-gray-800 placeholder-gray-500 bg-gray-100 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
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
                <p>{error && error}</p>
                <Link href="/Login">Login</Link>
            </form>
        </div>
      
    </div>
  )
}
