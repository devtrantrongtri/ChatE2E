'use client'
import ChatMessages from '@/components/Group/ChatMessages';
import CreateGroup from '@/components/Group/CreateGroup';
import GroupList from '@/components/Group/GroupList';
import JoinGroup from '@/components/Group/JoinGroup';
import SendMessageInGroup from '@/components/Group/SendMessage';
import HeaderSidebar from '@/components/SideBar/HeaderSidebar';
import { AuthContextProvider } from '@/context/AuthenContext';
import { SocketContextProvider } from '@/context/SocketContext';

import React, { useEffect, useState } from 'react'
interface Group {
  _id: string;
  groupName: string;
  members: string[]; 
  // avatarUrl?: string;
  // groupDescription?: string;
}
function Group({
  params,
}: {
  params: { userid: string };
}) {
  const [userGroups, setUserGroups] = useState([]);
  const [messageGroups, setMessageGroups] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(1); // use a simple counter to trigger updates
  const [selectedGroup, setSelectedGroup] = useState<Group>({
    _id: '',
    groupName: '',
    members : []
    // avatarUrl: string;
    // groupDescription: '';
  });



  //======================= use effect =========================
  // useEffect(() => {
  //   const el = document.getElementById('messages');
  //   if (el) {
  //     el.scrollTop = el.scrollHeight;
  //   }
  // }, []);
  useEffect(() => {
      const fetchUserGroups = async () => {
          try {
              const response = await fetch(`http://localhost:4041/users/group/${params.userid}`,{
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',});
              const data = await response.json();
              console.log(data.success , "and", data.msg.groupList);
              if (data.success) {
                  setUserGroups(data.msg.groupList);
              } else {
                  console.error('Failed to load groups', data);
              }
          } catch (error) {
              console.error('Error fetching groups:', error);
          }
      };

      

      fetchUserGroups();

      // if (selectedGroup._id) {
      //   fetchMessageGroups();
      // }  


  }, [params.userid, updateTrigger,selectedGroup]);
  const myGroup = [
    { _id: '2', groupName: 'Group2', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '1', groupName: 'Group1', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '3', groupName: 'Group3', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '4', groupName: 'Group4', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '5', groupName: 'Group5', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '6', groupName: 'Group6', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '7', groupName: 'Group7', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '8', groupName: 'Group8', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '9', groupName: 'Group9', avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" },
    { _id: '10', groupName:'Group10',avatarUrl: 'https://cdn-icons-png.freepik.com/512/33/33308.png?ga=GA1.1.131752735.1714715621',groupDescription:"abc" }
  ];
  
const joinGroup = async(groupName: string) => {
  console.log(groupName);
  try {
    const response = await fetch(`http://localhost:4041/messages/joinGroup/${params.userid}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        groupName: groupName,
      }),
    });
    if(response.ok){
      const data = await response.json();
      alert(` ${data.msg}`);
      setUpdateTrigger(prev => prev + 1);
      return data;
    }
  } catch (error) {
    console.log( "Lỗi ở đây",error)
    return error
  }
}
const createGroup = async (groupData : any) => {
  // console.log('Creating group with data:', groupData);
  try {
    const response = await fetch("http://localhost:4041/group", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        groupName: groupData.groupName,
        groupDescription: groupData.groupDescription
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("duuwx liệu :",data);
    // Check the response to determine the message
    if (Object.keys(data).length === 0) { // trả về {}
      // console.log('Group already exists.');
      alert("Group already exists");
      return 'Group already exists';
    } else {
      // console.log('Group created successfully:', data);
      alert(`Group ${data.groupName} created successfully`);
      return 'Group created successfully';
    }
  } catch (error) {
    alert(`Failed to create group with error: ${error}`);
  }
};
  // Handle group click
  const handleGroupClick = (groupName:string,groupId:string,members:string[]) => {
    console.log("Group clicked:", groupName,groupId);
    setSelectedGroup({...selectedGroup, groupName:groupName,_id:groupId,members:members}); 
    setUpdateTrigger(prev => prev + 1);
     // Now you can use this data in your component
};
const  handleUpdateMessageTrigger = async () => {
  setUpdateTrigger(prev => prev + 1);
  // await fetchMessageGroups()
};
  return (
    <AuthContextProvider>
      <SocketContextProvider>
    <div className='flex h-screen overflow-hidden'>
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <HeaderSidebar username={""} userid={params.userid} ></HeaderSidebar>
        <hr />
        <div className='overflow-y-auto h-1/4'>
          <CreateGroup onCreateGroup={createGroup}></CreateGroup>
        </div>
          <hr />
          <div className='overflow-y-auto h-1/6'>
            <JoinGroup onJoinGroup={joinGroup}></JoinGroup>
          </div>
          <hr />
        {/*Side Bar Contact List */}
        <div className='overflow-y-auto h-3/5'>
        <GroupList groups={userGroups} onGroupClick={handleGroupClick}></GroupList>                                                  
        </div>
      </div>


{/* chat components */}
<div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen w-3/4 bg-slate-900 border-b">
  <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
    
  <div className="relative flex items-center space-x-4">





{/* avartar và active status và tên nhóm */}
      <div className="relative">
        <span className="absolute text-green-500 right-0 bottom-0">
          <svg width={20} height={20}>
            <circle cx={8} cy={8} r={8} fill="currentColor" />
          </svg>
        </span>
        <img src="https://assetadmin.sgod.vn/images/logos/logo-word.svg" alt="avc" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
      </div>
      
      <div className="flex flex-col leading-tight">
        <div className="text-2xl mt-1 flex items-center">
          <span className="text-white mr-3">{selectedGroup.groupName}</span>
        </div>
        <span className="text-lg text-gray-600">{selectedGroup.members ? selectedGroup.members.length + ' member' : ''}</span>
      </div>
    </div>


    <div className="flex items-center space-x-2">

      {/* thêm người dùng vào nhóm hoặc tham gia nhóm */}
      <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

    </div>
  </div>



<ChatMessages groupName={selectedGroup.groupName} userId={params.userid} trigger={updateTrigger}></ChatMessages>
{/* tin nhắn ở đây */}
{/* <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
<div className="chat-message">
    <div className="flex items-end">
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
        <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
      </div>
      <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
    </div>
  </div>
  <div className="chat-message">
    <div className="flex items-end justify-end">
      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
        <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
      </div>
      <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
    </div>
  </div>
  </div> */}


  <SendMessageInGroup senderId={params.userid} receiverId={selectedGroup._id} groupName={selectedGroup.groupName} handleUpdateMessageTrigger = {handleUpdateMessageTrigger}></SendMessageInGroup>

</div>

</div>

</SocketContextProvider>
    </AuthContextProvider>
  )
}

export default Group



// -------------- chat-message -------------- :
/*

    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Can be verified on any platform using docker</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Your error message says permission denied, npm global installs must be given root privileges.</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">Command was run with root privileges. I'm sure about that.</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I've update the description so it's more obviously now</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">FYI https://askubuntu.com/a/700266/510172</span></div>
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
              Check the line above (it ends with a # so, I'm running it as root )
              <pre># npm install -g @vue/devtools</pre>
            </span>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Any updates on this issue? I'm getting the same error when trying to install devtools. Thanks</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">Are you using sudo?</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">Run this command sudo chown -R `whoami` /myGroup/{'{'}{'{'}your_user_profile{'}'}{'}'}/.npm-global/ then install the package globally without using sudo</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">It seems like you are from Mac OS world. There is no /myGroup/ folder on linux ?</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">I have no issue with any other packages installed with root permission globally.</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-2" />
      </div>
    </div>
    <div className="chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I get the same error on Arch Linux (also with sudo)</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">I also have this issue, Here is what I was doing until now: #1076</span></div>
          <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">even i am facing</span></div>
        </div>
        <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
      </div>
    </div>

*/




// <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
// <div className="relative flex">

//   {/* miro */}
//   <span className="absolute inset-y-0 flex items-center">
//     <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//       </svg>
//     </button>
//   </span>

//   {/* input tin nhắn */}
//   <input type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3" />
  
  
//   <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
    
//     {/* gửi file */}
//     <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//       </svg>
//     </button>

//     {/* gửi hình ảnh */}
//     <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     </button>

//     {/* emoji */}
//     <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     </button>

//     {/* Nút send message */}
//     <button type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
//       <span className="font-bold">Send</span>
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
//         <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//       </svg>
//     </button>

//   </div>
// </div>
// </div>
