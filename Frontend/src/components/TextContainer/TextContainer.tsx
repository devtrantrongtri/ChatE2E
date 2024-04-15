import React, { useEffect, useState } from 'react';
import { getConversation } from "@/utils/getConversationByUserId";
import { scrollToBottom } from '@/utils/scroll';
import Messages from './Messages';
import SendMessage from './SendMessage';
import Tittle from '../TittleApp/Tittle';

interface TextContainerProps {
  receiverId: string | undefined,
  username : string ,
}

interface Message {
  message: string;
  _id: string;
  senderId?: string;
  receiverId: string;
  createAt: Date;
}

const TextContainer: React.FC<TextContainerProps> = ({ receiverId, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateMessages = async () => {
    try {
      setLoading(true);
      const response = await getConversation(receiverId);
      setLoading(false);
      if (response === null) {
        setMessages([]);
      } else {
        setMessages(response.messageIds);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateMessages();
  }, [receiverId]);

  return (
    <div className="flex-1">
      <Tittle></Tittle>
      <header className="bg-slate-900  text-gray-700 border-b">
        <div
          className={`flex items-center  mb-4 cursor-pointer text-white p-2 rounded-md`}
        >
          <div className="w-12 h-12 rounded-full mr-3 ">
            <div className="relative">
              <img
                src={`https://placehold.co/200x/FFFAF0/0A0A0A.svg?text=${username
                  .charAt(0)
                  .toUpperCase()}&font=Lato`}
                alt="User Avatar"
                className="w-12 h-12 rounded"
              />
              <span className="absolute bottom-0 left-8 transform translate-y-1/4 w-6 h-6 bg-green-400 blur-sm border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
          </div>
          <div className="flex-1  ">
            <h2 className="text-lg   font-semibold">{username}</h2>
            <h5>online</h5>
          </div>
        </div>
      </header>
      <Messages receiverId={receiverId} username={username} messages={messages} updateMessages={updateMessages} />
      
      <SendMessage receiverId={receiverId} updateMessages={updateMessages} />
    </div>
  );
};

export default TextContainer;
