"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [groupMembers, setGroupMembers] = useState(['']); // Initialize with one input for group members
  const [contact, setContact] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [location, setLocation] = useState(''); // New location field
  const [error, setError] = useState(null);

  // Handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!groupName || !subject || groupMembers.some(member => member === '') || !contact || !meetingTime || !location) {
      setError('All fields are required');
      return;
    }

    try {
      // Make a POST request to create a new group
      const res = await fetch("/api/createGroup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName,
          subject,
          groupMembers,
          description,
          contact,
          meetingTime,
          location, // Include location in the body
        }),
      });

      if (res.ok) {
        // Reset the form after successful submission
        setGroupName('');
        setSubject('');
        setGroupMembers(['']);
        setDescription('');
        setContact('');
        setMeetingTime('');
        setLocation(''); // Reset location field
        setError(null);
        console.log("Group created successfully");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Creation failed");
      }
    } catch (err) {
      console.log("Group creation error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  // Function to add more group members
  const addMemberField = () => {
    setGroupMembers([...groupMembers, '']);
  };

  // Function to handle input changes for group members
  const handleMemberChange = (index, value) => {
    const updatedMembers = [...groupMembers];
    updatedMembers[index] = value;
    setGroupMembers(updatedMembers);
  };

  // Function to remove a group member field
  const removeMemberField = (index) => {
    const updatedMembers = [...groupMembers];
    updatedMembers.splice(index, 1);
    setGroupMembers(updatedMembers);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create a New Group</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Group Members</label>
          {groupMembers.map((member, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                placeholder={`Member ${index + 1}`}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {groupMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMemberField(index)}
                  className="bg-red-500 text-white px-3 py-2 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMemberField}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Member
          </button>
        </div>

        <div>
          <label className="block text-lg font-medium">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Meeting Time</label>
          <input
            type="text"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded mt-4"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroupForm;
