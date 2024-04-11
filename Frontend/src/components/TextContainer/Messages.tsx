import React, { useEffect, useState } from 'react';
import { getConversation } from "@/utils/getConversationByUserId";
import { scrollToBottom } from '@/utils/scroll';

interface TextContainerProps {
  receiverId: string | undefined,
  username : string | undefined,

}

interface Message {
  message: string;
  _id: string;
  senderId?: string;
  receiverId: string;
  createAt: Date;
}

const Messages: React.FC<TextContainerProps> = ({ receiverId ,username,}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (receiverId) {
          setLoading(true);
          const response = await getConversation(receiverId);
          setLoading(false);
          if (response === null) {
            setMessages([]);
          } else {
            setMessages(response.messageIds);
          }
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    fetchConversation();

  }, [receiverId]);// tôi muốn fetch messages vì next có sẵn tính năng streming
  
  if (loading) {
    return (
    // <div className="h-screen  bg-slate-900">
  <div className="flex justify-center h-screen bg-slate-900 pt-44 ">
      <span className="text-white">Loading...</span>
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
    </div>
  </div>
    // </div>

    )
    
  }

  return (
    <div className="h-screen bg-slate-900 overflow-y-auto p-10 pb-60">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
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
        ))
      ) : (
        <div className="flex mb-4 cursor-pointer">
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
         <img
            src="https://placehold.co/200x/F4C501/ffffff.svg?text=App&font=Lato"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex max-w-96 bg-yellow-300 rounded-lg p-3 gap-3">
          {/* <p className="text-gray-700">{mess.message}</p> */}
        <p className='text-gray-700'>Tạo một mối quan hệ mới với {username} nhé !</p>

        </div>
      </div>
      )}
    </div>
  );
  
}

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
