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

export const POST = async (req) => {
  try {
    await connect(); // Connect to the database

    const { groupName, subject, groupMembers, description, contact, meetingTime } = await req.json();
    
    console.log({ groupName, subject, groupMembers, description, contact, meetingTime }); // Log the received data

    // Create a new instance of the Group model
    const newGroup = new Group({
      groupName,
      subject,
      groupMembers,
      description,
      contact, // Add the contact field
      meetingTime, // Add the meeting time field
    });

    await newGroup.save(); // Save the new group to the database
    return new NextResponse("Group is registered", { status: 200 });
  } catch (err) {
    console.error("Error registering group:", err);
    return new NextResponse("Failed to register group: " + err.message, { status: 500 });
  }
};