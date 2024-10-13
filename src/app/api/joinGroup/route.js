import { NextResponse } from 'next/server';
import connect from '@/utils/db.js';
import User from '@/models/User';
import Group from '@/models/Groups';

export const POST = async (req) => {
  try {
    await connect(); // Connect to the database

    const { userId, groupId } = await req.json(); // Get user ID and group ID from the request body

    // Fetch the user and group from the database
    const user = await User.findById(userId);
    const group = await Group.findById(groupId);

    if (!user || !group) {
      return new NextResponse('User or Group not found', { status: 404 });
    }

    // Check if the user's name is already in the group
    if (group.groupMembers.includes(user.name)) {
      return new NextResponse('User is already in this group', { status: 400 });
    }

    // Add the user's name to the groupMembers array of the group
    group.groupMembers.push(user.name);
    await group.save();

    // Add the group to the groupsYoureIn array of the user (using ObjectId)
    user.groupsYoureIn.push(groupId);
    await user.save();

    return new NextResponse('User successfully joined the group', { status: 200 });
  } catch (err) {
    console.error('Error joining group:', err);
    return new NextResponse('Failed to join group: ' + err.message, { status: 500 });
  }
};
