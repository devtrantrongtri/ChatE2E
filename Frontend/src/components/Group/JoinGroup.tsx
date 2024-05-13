import React, { useState } from 'react';

function JoinGroup({ onJoinGroup }: any) {
  const [groupName, setGroupName] = useState('');

  const handleInputChange = (event: any) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Validate the groupName
    if (!groupName.trim()) {
      alert('Please enter a group name');
      return;
    }
    // Call onJoinGroup callback function with the group name
    onJoinGroup(groupName);
    // Reset the group name
    setGroupName('');
  };

  return (
    <div className='overflow-y-auto bg-slate-950 h-screen p-2'>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="groupName" className="flex justify-center uppercase text-sm font-medium text-white">
            Join Group
          </label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={groupName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border bg-slate-800 text-white border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter group name"
            required
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button type="submit" className=" bg-indigo-500 text-white py-2 w-full rounded-md ">
            Join
          </button>
        </div>
      </form>
    </div>
  );
}

export default JoinGroup;
