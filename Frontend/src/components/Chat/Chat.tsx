// 'use client'
// import React, { useEffect, useState } from "react";
// import TextContainer from "../TextContainer/TextContainer";
// import HeaderSidebar from "../SideBar/HeaderSidebar";
// import { getAllUsers } from '@/utils/getUser';
// import { useRouter } from 'next/navigation';

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   avatarUrl?: string;
//   receiverId?: string;
//   // Add other properties if necessary
// }

// const ChatComponents : React.FC = (Params)=> {
//   const [users,setUsers] = useState<User[]>([]);
//   const [friendId,setFriend] = useState<string>();
//   const router = useRouter();

//   useEffect(() => {
//      let fetchUsers = async ()  =>{
//         try {
//           const userList = await getAllUsers(Params.userId);
//           setUsers(userList);
//         } catch (error) {
//           console.log(error);
//           router.push('/login')
//         }
//      }
//      fetchUsers();
//   },[]);

//   return (
//     <div className="flex h-screen overflow-hidden">
        
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white border-r border-gray-300">

//         {/* Sidebar Header */}
//         <HeaderSidebar></HeaderSidebar>

//         {/*Side Bar Contact List */}
//        <div  className="overflow-y-auto h-screen p-3 mb-9 pb-20">
//            {users.map(user => (
          
//           <div onClick={()=>{setFriend(user._id),console.log(friendId)}}  key={user._id} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
//             <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
//               <img
//                 src={user.avatarUrl ? user.avatarUrl : "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"} alt="User Avatar" className="w-12 h-12 rounded-full"/>
//             </div>
//             <div className="flex-1">
//               <h2 className="text-lg font-semibold">{user.username}</h2>
//               <p className="text-gray-600">**********</p>
//             </div>
//           </div>
//       ))}
//         </div>
//       </div>
      
//       {/* Main Chat Area */}
//         <TextContainer receiverId = {friendId}></TextContainer>
//     </div>
//   );
// }

// export default ChatComponents;
