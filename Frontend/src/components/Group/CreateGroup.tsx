import React, { useState } from 'react';

function CreateGroup({ onCreateGroup}:any) {
  const [formData, setFormData] = useState({
    groupName: '',
    groupDescription: '',
  });

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Validate form fields
    if (!formData.groupName.trim() || !formData.groupDescription.trim()) {
      alert('Please fill out all fields');
      return;
    }
    // Call onCreateGroup callback function with group data
    onCreateGroup(formData);
    // Reset form fields
    setFormData({
      groupName: '',
      groupDescription: '',
    });
  };

  return (
    <div className='overflow-y-auto bg-slate-950 h-screen p-2'>

    <form onSubmit={handleSubmit}>
      <div className="mb-4 ">
        <label htmlFor="groupName" className="block text-sm font-medium text-white">
          Group Name
        </label>
        <input
          type="text"
          id="groupName"
          name="groupName"
          value={formData.groupName}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border bg-slate-800 text-white border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Enter group name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="groupDescription" className="block text-sm font-medium text-white">
          Group Description
        </label>
        <textarea
          id="groupDescription"
          name="groupDescription"
          value={formData.groupDescription}
          onChange={handleInputChange}
          className="mt-1 p-2 block w-full border bg-slate-800 text-white border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Enter group description"
          required
        />
      </div>
      <div className="mt-4">
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md">
          Create Group
        </button>
      </div>
    </form>
</div>
  );
}
export default CreateGroup;
