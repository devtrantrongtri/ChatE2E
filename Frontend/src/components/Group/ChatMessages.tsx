import { useSocketContext } from '@/context/SocketContext';
import React, { useState, useEffect } from 'react';
type Message = {
    _id: string;
    senderId: string;
    receiverId : string; 
    message : string;
    participants : string[]
    avatarUrl ?: string;
  };
  type Data = {
    groupName: string;
    senderId: string;
    receiverId : string; 
    message : string;
    success: boolean;
    avatarUrl ?: string;
  };
    
    // Props definition using TypeScript for better type checking
    interface ChatListProps {
      groupName: string;
      userId : string;
      trigger:any
    //   onChatClick: (Chat: string) => void;
  }
const ChatMessages:React.FC<ChatListProps> = ({ groupName , userId,trigger }) => {
  const [messages, setMessages] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();
  // useEffect(() => {
  //   if (socket) {
  //     socket.on("groupMessageSent", (data) => {
  //       console.log("update Message nèeeeeeeeeeeeeeeeeee",data)
  //       // handleUpdateMessageTrigger(); // Update messages when messageSentSignal is received
  //     });
  //   }
  //   return () => {
  //     if (socket) {
  //       socket.off("groupMessageSent"); // Clean up event listener when component unmounts
  //     }
  //   };
  // }, [socket]);
  console.log(socket);
  useEffect(() => {
    if (socket) {
      console.log(`Emitting groupSocketConnected for group ${groupName}`);
      socket.emit('groupSocketConnected', groupName);

      socket.on('groupMessageSent', (data: Data) => {
        setMessages((prev : Data[]) => [...prev,data]);
        console.log("update message", data);
      });

      return () => {
        socket.off('groupMessageSent');
      };
    }
  }, [socket, groupName]);
  useEffect(() => {
    // Gọi API để lấy tin nhắn
    const fetchMessages = async () => {
        setLoading(true);
      try {
        const response = await fetch(`http://localhost:4041/messages/group/${groupName}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
  
        });
        const data = await response.json();
        // console.log(data.success, "and", data);
        if (data) {
            console.log("data :",data)
          setMessages(data.messageIds);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }finally {
        setLoading(false);
      }
    };

    if(groupName != ''){
        fetchMessages();
        setMessages([])
    }
  }, [groupName]);

  useEffect(() => {
    const el = document.getElementById('messages');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);
// console.log('Messages loaded',messages);
  return (
    <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      {messages.map((message : Data, index) => (
        <div key={index} className="chat-message">
          <div className={`flex items-end ${message.senderId === userId ? 'justify-end' : ''}`}>
            <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${message.senderId === userId ? 'order-1 items-end' : 'order-2 items-start'}`}>
              <div>
                <span className={`px-4 py-2 rounded-lg inline-block ${message.senderId === userId ? 'rounded-br-none bg-blue-600 text-white' : 'rounded-bl-none bg-gray-300 text-gray-600'}`}>
                  {message.message}
                </span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
              alt="Profile"
              className={`w-6 h-6 rounded-full ${message.senderId === userId ? 'order-2' : 'order-1'}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
