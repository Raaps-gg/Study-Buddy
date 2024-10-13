import Group from '@/models/Groups.js'; // Group model schema
import { NextResponse } from 'next/server';
import connect from "@/utils/db.js";



// Handle POST requests to create a new group
export const POST = async (req) => {
  try {
    await connect(); // Connect to the database

    const { groupName, subject, groupMembers, description, contact, meetingTime, location } = await req.json();
    
    console.log({ groupName, subject, groupMembers, description, contact, meetingTime, location }); // Log the received data

    // Create a new instance of the Group model
    const newGroup = new Group({
      groupName,
      subject,
      groupMembers,
      description,
      contact, // Add the contact field
      meetingTime, // Add the meeting time field
      location, // Add the location field
    });

    await newGroup.save(); // Save the new group to the database
    return new NextResponse("Group is registered", { status: 200 });
  } catch (err) {
    console.error("Error registering group:", err);
    return new NextResponse("Failed to register group: " + err.message, { status: 500 });
  }
};