import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
   // Destructure user information from the session object
   const { user } = session;

   return (
     <div className="flex flex-col space-y-4" >
       <h1 className="text-2xl font-bold">Welcome to your Dashboard, {user?.name}</h1>
       <p className="text-lg">Email: {user?.email}</p>
       {/* You can display other user-related info here */}
     </div>
   );
 };

export default Dashboard;