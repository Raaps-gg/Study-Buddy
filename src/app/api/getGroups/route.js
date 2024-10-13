import Group from '@/models/Groups.js'; // Group model schema
import { NextResponse } from 'next/server';
import connect from "@/utils/db.js";

// Handle GET requests to fetch all groups
export const GET = async () => {
    try {
      await connect(); // Connect to MongoDB
  
      const groups = await Group.find(); // Fetch all groups from MongoDB
      console.log(groups); // Log groups to ensure they are fetched
      return NextResponse.json(groups); // Send the groups as JSON
    } catch (err) {
      console.error("Error fetching groups:", err); // Log error
      return new NextResponse("Failed to fetch groups: " + err.message, { status: 500 });
    }
  };
