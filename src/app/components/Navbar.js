"use client";
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react'; // Assuming you are using NextAuth.js

const Navbar = () => {
  const { data: session } = useSession(); // Check if the user is logged in

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        {/* Navigation Links */}
        <div>
          <Link href="/" className="text-white text-2xl px-4">
            Study-Buddy
          </Link>
          
        </div>

        {/* Conditionally Render "Create Group" if User is Logged In */}
        <div className="flex items-center space-x-4">
          {session && (
            <>
              <Link href="/createGroup" className="text-white px-4">
                Create Group
              </Link>
              <Link href="/dashBoard" className="text-white px-4">
                DashBoard
              </Link>

              <button onClick={signOut} className="text-white bg-red-500 px-4 py-2 rounded">
                Sign Out
              </button>
            </>
          )}

          {!session && (
            <>
              <Link href="/LogIn" className="text-white px-4">
                Login
              </Link>
              <Link href="/createAccount" className="text-white px-4">
                Register
              </Link>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
