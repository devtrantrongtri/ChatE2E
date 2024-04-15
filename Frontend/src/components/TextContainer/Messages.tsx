import React, { useEffect } from "react";

interface MessagesProps {
  receiverId: string | undefined;
  username: string | undefined;
  messages: Message[];
  updateMessages: () => void; // Function to update messages
}

interface Message {
  message: string;
  _id: string;
  senderId?: string;
  receiverId: string;
  createAt: Date;
}

const Messages: React.FC<MessagesProps> = ({ receiverId, username, messages, updateMessages }) => {
  useEffect(() => {
   // scrollToBottom(); // Example: You need to implement this function
  }, [messages]);

  return (
    <div className="h-screen bg-slate-900 overflow-y-auto p-10 pb-60">
      {messages && messages.map((message) => (
        <div
          className={`flex mb-4 cursor-pointer ${
            message.senderId === receiverId ? "" : "justify-end"
          }`}
          key={message._id}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-2 ${message.senderId === receiverId ? "" : "ml-2"}`}>
            {/* <img
              src={message.senderId === receiverId ? "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" : "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            /> */}
          </div>
          <div className={`flex max-w-96 rounded-lg p-3 gap-3 ${message.senderId === receiverId ? "bg-white text-gray-700" : "bg-indigo-500 text-white"}`}>
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;




// import React, { useEffect, useState } from 'react'
// import { getConversation } from "@/utils/getConversationByUserId";

// interface TextContainerProps{
//   receiverId: string | undefined,

// }
// interface messages {
//   message: string,
//   _id: string,
//   senderId?: string,
//   receiverId: string,
//   createAt:Date,
// }
// const Messages: React.FC<TextContainerProps> = ({receiverId})=> {

//   const [mess, setMess] = useState<messages[]>([]);

//   useEffect(() => {
//     const fetchConversation = async () => {
//       try {
//         if (receiverId) {
//           const response = await getConversation(receiverId);
//           if (response === null) { 
//             setMess([])
//           } else {
//             // const messages = response.messageIds.map((message: any) => {
//             //   // Trích xuất các thuộc tính của mỗi message
//             //   const { _id, senderId, receiverId, message: messageContent, createdAt } = message;
//             //   return {
//             //     _id,
//             //     senderId,
//             //     receiverId,
//             //     messageContent,
//             //     createdAt
//             //   };
//             // });
//             let messages = response.messageIds
//             console.log(messages);
//             setMess(messages); 
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchConversation();
//   },[receiverId]);


//   return (

//     <div className="h-screen bg-slate-900 overflow-y-auto p-10 pb-60 ">
//       {Array.isArray(mess) && mess.map( mess => {
//   // Kiểm tra nếu senderId của tin nhắn bằng receiverId (tin nhắn đi ra)
//   if (mess.senderId === receiverId) {
//     return (
//        
//     );
//   } else {
//     // Nếu không, hiển thị tin nhắn đến
//     return (
     
//       <div className="flex justify-end mb-4 cursor-pointer" key={mess._id}>
//       <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
//         <p>{mess.message}</p>
//       </div>
//       <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
//         <img
//           src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
//           alt="My Avatar"
//           className="w-8 h-8 rounded-full"
//         />
//       </div>
//     </div>
//     );
//   }

// })}

//     </div>
//   )
// }

// export default Messages
