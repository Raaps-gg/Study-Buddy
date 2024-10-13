"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState(''); // New contact state
  const [meetingTime, setMeetingTime] = useState(''); // New meeting time state
  const [groupMembers, setGroupMembers] = useState(['']); // Initialize with one input
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName || !subject || groupMembers.some(member => member === '')) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch("/api/createGroup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupName,
          subject,
          groupMembers,
          description,
          contact, // Send contact info
          meetingTime, // Send meeting time
        }),
      });

      if (res.ok) {
        // Reset the form
        setGroupName('');
        setSubject('');
        setGroupMembers(['']);
        setDescription('');
        setContact(''); // Reset contact
        setMeetingTime(''); // Reset meeting time
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

  const addMemberField = () => {
    setGroupMembers([...groupMembers, '']);
  };

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...groupMembers];
    updatedMembers[index] = value;
    setGroupMembers(updatedMembers);
  };

  const removeMemberField = (index) => {
    const updatedMembers = [...groupMembers];
    updatedMembers.splice(index, 1);
    setGroupMembers(updatedMembers);
  };

  return (
    <div className="bg-blue-100 p-10 rounded-lg shadow-md max-w-lg mx-auto mt-10 retro-style">
      <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">Create a Study Group</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="groupName" className="block text-lg font-medium text-blue-700">Group Name:</label>
          <input
            type="text"
            id="groupName"
            className="w-full p-2 rounded-md border-2 border-blue-400"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-lg font-medium text-blue-700">Subject:</label>
          <input
            type="text"
            id="subject"
            className="w-full p-2 rounded-md border-2 border-blue-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-blue-700">Group Members:</label>
          {groupMembers.map((member, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                className="w-full p-2 rounded-md border-2 border-blue-400"
                placeholder={`Member ${index + 1}`}
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                required
              />
              {groupMembers.length > 1 && (
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                  onClick={() => removeMemberField(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMemberField}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
          >
            Add Member
          </button>
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-blue-700">Description:</label>
          <textarea
            id="description"
            className="w-full p-2 rounded-md border-2 border-blue-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="contact" className="block text-lg font-medium text-blue-700">Contact:</label>
          <input
            type="text"
            id="contact"
            className="w-full p-2 rounded-md border-2 border-blue-400"
            value={contact}
            onChange={(e) => setContact(e.target.value)} // Handle contact input
            required
          />
        </div>

        <div>
          <label htmlFor="meetingTime" className="block text-lg font-medium text-blue-700">Meeting Time:</label>
          <input
            type="text"
            id="meetingTime"
            className="w-full p-2 rounded-md border-2 border-blue-400"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)} // Handle meeting time input
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
