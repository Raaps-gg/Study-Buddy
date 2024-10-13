"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-900 shadow-lg p-6">
      <ul className="flex justify-between items-center text-white">
        <div>
          <Link href="/">
            <li className="cursor-pointer font-semibold text-lg">Study-Buddy</li>
          </Link>
        </div>
        <div className="flex gap-10 items-center">
          <Link href="/dashBoard">
            <li className="cursor-pointer font-semibold text-lg hover:text-gray-200 transition">Dashboard</li>
          </Link>
          {!session ? (
            <>
              <Link href="/LogIn">
                <li className="cursor-pointer font-semibold text-lg hover:text-gray-200 transition">Login</li>
              </Link>
              <Link href="/createAccount">
                <li className="cursor-pointer font-semibold text-lg hover:text-gray-200 transition">Register</li>
              </Link>
            </>
          ) : (
            <>
              <span>{session.user?.email}</span>
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-5 rounded-full transition-transform transform hover:scale-105"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
