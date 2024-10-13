const GroupCard = ({ group, userEmail }) => {
    const handleJoinGroup = async () => {
      try {
        const res = await fetch(`/api/joinGroup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupId: group._id, // Pass group ID
            userEmail, // Pass the user's email
          }),
        });
  
        if (res.status === 200) {
          alert("You have successfully joined the group!");
        } else {
          const { error } = await res.json();
          alert(`Failed to join group: ${error}`);
        }
      } catch (err) {
        console.error("Error joining group:", err);
        alert("An error occurred while joining the group.");
      }
    };
  
    return (
      <div className="border p-4 rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-2">{group.groupName}</h2>
        <p className="text-gray-700">Subject: {group.subject}</p>
        <p className="text-gray-500">Members: {group.groupMembers.join(", ")}</p>
        <p className="text-gray-600">Description: {group.description}</p>
        <p className="text-gray-600">Contact: {group.contact}</p> {/* Display contact */}
        <p className="text-gray-600">Meeting Time: {group.meetingTime}</p> {/* Display meeting time */}
        <p className="text-gray-600">Location: {group.location}</p> {/* Display meeting time */}
        <button
          onClick={handleJoinGroup}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Join Group
        </button>
      </div>
    );
  };
  
  export default GroupCard;
  