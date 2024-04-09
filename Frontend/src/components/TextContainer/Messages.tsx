import React, { useEffect, useState } from 'react'
import { getConversation } from "@/utils/getConversationByUserId";

interface TextContainerProps{
  receiverId: string | undefined,

}
const Messages: React.FC<TextContainerProps> = ({receiverId})=> {

  const [mess, setMess] = useState<Response | null>();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (receiverId) {
          const response = await getConversation(receiverId);
          if (Array.isArray(response)) { 
            setMess(null);
          } else {
            const messages = response.messageIds.map((message: any) => {
              // Trích xuất các thuộc tính của mỗi message
              const { _id, senderId, receiverId, message: messageContent, createdAt } = message;
              return {
                _id,
                senderId,
                receiverId,
                messageContent,
                createdAt
              };
            });
            setMess(messages); 
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchConversation();
  },[receiverId,mess]);


  return (

    <div className="h-screen overflow-y-auto p-10 pb-60 ">
      {Array.isArray(mess) && mess.map( mess => {
  // Kiểm tra nếu senderId của tin nhắn bằng receiverId (tin nhắn đi ra)
  if (mess.senderId === receiverId) {
    return (
       <div className="flex mb-4 cursor-pointer" key={mess._id}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
          <p className="text-gray-700">{mess.messageContent}</p>
        </div>
      </div>
    );
  } else {
    // Nếu không, hiển thị tin nhắn đến
    return (
     
      <div className="flex justify-end mb-4 cursor-pointer" key={mess._id}>
      <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
        <p>{mess.messageContent}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          alt="My Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
    );
  }
})}

    </div>
  )
}

export default Messages
