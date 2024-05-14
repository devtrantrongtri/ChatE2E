import React from 'react'

// Define a type for the GroupList for better type checking
type Group = {
  _id: string;
  groupName: string;
  groupDescription?: string; 
  avatarUrl : string;
};

  
  // Props definition using TypeScript for better type checking
  interface GroupListProps {
    groups: Group[];
    onGroupClick: (groupName: string,groupId :string) => void;
}
  const GroupList: React.FC<GroupListProps> = ({ groups,onGroupClick }) =>{

  return (
    <div className=" bg-slate-950  p-3 mb-9 pb-20 h-screen">
        <label htmlFor="groupName" className=" text-sm font-medium text-white flex justify-center uppercase">
          Your Groups
        </label>
          {groups.map((group) => (
            <div
              key={group._id}
              typeof="checkbox"
              className={` flex items-center  mb-4 cursor-pointer text-white hover:text-black hover:bg-gray-400 active:bg-gray-50 p-2 rounded-md `}
              onClick={() => onGroupClick(group.groupName,group._id)}
            >
              <div className="w-12 h-12 rounded-full mr-3 ">
                <img
                  src={
                    group.avatarUrl
                      ? group.avatarUrl
                      : `https://placehold.co/200x/FFFAF0/0A0A0A.svg?text=${group.groupName
                          .charAt(0)
                          .toUpperCase()}&font=Lato`
                  }
                  alt="Group Avatar"
                  className="w-12 h-12 rounded-full bg-white border-4 border-solid border-indigo-500/75"
                />
              </div>
              <div className="flex-1  ">
                <h2 className="text-lg   font-semibold">{group.groupName}</h2>
                <p className="text-gray-300">{group.groupDescription || 'No description'}</p>
              </div>
            </div>
          ))}
        </div>
  )
}

export default GroupList