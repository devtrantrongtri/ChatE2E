import React from 'react'

// Define a type for the GroupList for better type checking
type GroupList = {
    _id: number;
    username: string;
    avatarUrl: string;
  };
  
  // Props definition using TypeScript for better type checking
  interface GroupListProps {
    onGroupList: GroupList[];
  }
  const GroupList: React.FC<GroupListProps> = ({ onGroupList }) =>{
    const myGroup = onGroupList;
  return (
    <div className=" bg-slate-950  p-3 mb-9 pb-20">
          {myGroup.map((user) => (
            <div
              key={user._id}
              typeof="checkbox"
              className={` flex items-center  mb-4 cursor-pointer text-white hover:text-black hover:bg-gray-400 active:bg-gray-50  p-2 rounded-md `}
            >
              <div className="w-12 h-12 rounded-full mr-3 ">
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : `https://placehold.co/200x/FFFAF0/0A0A0A.svg?text=${user.username
                          .charAt(0)
                          .toUpperCase()}&font=Lato`
                  }
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full bg-white border-4 border-solid border-indigo-500/75"
                />
              </div>
              <div className="flex-1  ">
                <h2 className="text-lg   font-semibold">{user.username}</h2>
                {/* <p className="text-gray-600">**********</p> */}
              </div>
            </div>
          ))}
        </div>
  )
}

export default GroupList