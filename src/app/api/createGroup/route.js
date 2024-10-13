import Group from '@/models/Groups.js' // Group model schema
import { NextResponse } from 'next/server';
import connect from "@/utils/db.js";

export const POST = async (req) => {
  try {
    // Connect to the database
    await connect();

    const { groupName, subject, groupMembers, description, userId } = await req.json();

    // Create a new instance of the Group model
    const newGroup = new Group({
      groupName,
      subject,
      groupMembers, // Correct field name from your schema
      description
    });

    await newGroup.save(); // Save the new group to the database

    // await User.findByIdAndUpdate(
    //   userId,
    //   { $addToSet: { pastGroups: newGroup._id } }, // Add the new group's ID to the user's pastGroups
    //   { new: true } // Return the updated user document
    // );  

    // if (groupMembers && groupMembers.length > 0) {
    //   await User.updateMany(
    //     { _id: { $in: groupMembers } }, // Find users whose IDs are in the groupMembers array
    //     { $addToSet: { pastGroups: newGroup._id } } // Add the new group's ID to their pastGroups
    //   );
    // }

    return new NextResponse("Group is registered", { status: 200 });
    
  } catch (err) {
    return new NextResponse("Failed to register group: " + err.message, { status: 500 });
  }
};
