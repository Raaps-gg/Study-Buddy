import Group from '@/models/Groups.js' // Group model schema
import { NextResponse } from 'next/server';
import connect from "@/utils/db.js";

export const POST = async (req) => {
  try {
    // Connect to the database
    await connect();

    const { groupName, subject, groupMembers, description } = await req.json();

    // Create a new instance of the Group model
    const newGroup = new Group({
      groupName,
      subject,
      groupMembers, // Correct field name from your schema
      description,
    });

    await newGroup.save(); // Save the new group to the database
    return new NextResponse("Group is registered", { status: 200 });
    
  } catch (err) {
    return new NextResponse("Failed to register group: " + err.message, { status: 500 });
  }
};
