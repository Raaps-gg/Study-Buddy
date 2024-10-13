import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/User";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/Login");
  }
   // Destructure user information from the session object
   const { user } = session;
   let pastGroups = [];

   try {
    await connect();

    const userData = await User.findById(user.id).populate(pastGroups);
    pastGroups = userData.pastGroups || [];
   } catch (err) {
    console.error("Error getting past groups", err)
   }


   return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>
      <p className="text-lg">Email: {user?.email}</p>
      <h2 className="text-xl font-semibold">Past Groups</h2>
      <div className="space-y-2">
        {pastGroups.length > 0 ? (
          pastGroups.map((group) => (
            <div key={group._id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{group.groupName}</h3>
              <p><strong>Subject:</strong> {group.subject}</p>
              <p><strong>Description:</strong> {group.description}</p>
            </div>
          ))
        ) : (
          <p>No past groups found.</p>
        )}
      </div>
    </div>
  );
 };

export default Dashboard;