"use client"; // Required for client-side components

import { useState, useEffect } from 'react';
import GroupCard from './components/GroupCard'; // Adjust the path if GroupCard is in src/components
import { useSession } from 'next-auth/react'; // Assuming you're using NextAuth.js for session management

export default function Home() {
  const [groups, setGroups] = useState([]); // State to store all groups
  const [error, setError] = useState(null); // State for handling errors
  const { data: session } = useSession(); // Get the current session to retrieve the user

  useEffect(() => {
    // Fetch groups from the API
    const fetchGroups = async () => {
      try {
        const res = await fetch('/api/getGroups'); // Correct route for fetching groups
        if (!res.ok) {
          throw new Error('Failed to fetch groups');
        }
        const data = await res.json();
        setGroups(data); // Set fetched groups
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGroups();
  }, []);

  // Function to handle joining a group
  const handleJoinGroup = async (groupId) => {
    if (!session || !session.user) {
      setError('You must be logged in to join a group.');
      return;
    }

    const userId = session.user.id; // Assuming session contains user ID

    try {
      const res = await fetch('/api/joinGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          groupId,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to join group');
      }

      // Success message or any UI update can go here
      console.log('Successfully joined the group');
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Groups</h1>

      {/* Error Handling */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length > 0 ? (
          groups.map(group => (
            <GroupCard
              key={group._id}
              group={group}
              onJoin={() => handleJoinGroup(group._id)} // Pass group ID to handleJoinGroup
            />
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </div>
  );
}
