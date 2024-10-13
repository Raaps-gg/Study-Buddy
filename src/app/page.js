"use client"; // This is required in Next.js for client-side components in the App Router

import { useState, useEffect } from 'react';
import GroupCard from './components/GroupCard'; // Adjust the path if GroupCard is in src/components

export default function Home() {
  const [groups, setGroups] = useState([]); // State to store all groups
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch groups from the API
    const fetchGroups = async () => {
      try {
        const res = await fetch('/api/createGroup'); // Correct route for fetching groups
        if (!res.ok) {
          throw new Error("Failed to fetch groupszzz");
        }
        const data = await res.json();
        setGroups(data); // Set fetched groups
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Groups</h1>

      {/* Error Handling */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Group Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length > 0 ? (
          groups.map(group => (
            <GroupCard key={group._id} group={group} />
