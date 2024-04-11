'use client'
import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Tittle from '../TittleApp/Tittle'

interface ChatProps {
  receiverId: string | undefined
  username: string | 'chatApp'
  avartar : string 
}


const TextContainer : React.FC<ChatProps> = ({receiverId,username}) => {
  const [friendId, setFriendId] = useState<string | undefined>(receiverId);
  useEffect(() => {
    // Update friendId when receiverId from props changes
    setFriendId(receiverId??'');
  }, [receiverId,setFriendId,Messages]);
  return (
    <div className="flex-1">
      <Tittle></Tittle>
      {/* Chat Header */}
      <header className="bg-slate-900  text-gray-700 border-b">
        {/* <img className='round-full' src={avartar ? avartar : `https://placehold.co/200x/ffa8e4/ffffff.svg?text=-.-&font=Lato`} alt="avartar" /> */}
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
            {/* <p className="text-gray-600">**********</p> */}
          </div>
        </div>
      </header>
      {/* Chat Messages */}
      <Messages receiverId={friendId} username={username}></Messages>
      {/* Chat Input */}
      <SendMessage receiverId={friendId}></SendMessage>
    </div>
  );
}

export default TextContainer