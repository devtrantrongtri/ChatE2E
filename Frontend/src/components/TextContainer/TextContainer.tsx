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


const TextContainer : React.FC<ChatProps> = ({receiverId,username,avartar}) => {
  const [friendId, setFriendId] = useState<string | undefined>(receiverId);
  useEffect(() => {
    // Update friendId when receiverId from props changes
    setFriendId(receiverId??'');
  }, [receiverId]);
  return (
    <div className="flex-1">
    <Tittle></Tittle>
    {/* Chat Header */}
    <header className="bg-white p-4 text-gray-700">
    {/* <img className='round-full' src={avartar ? avartar : `https://placehold.co/200x/ffa8e4/ffffff.svg?text=-.-&font=Lato`} alt="avartar" /> */}
    <h1 className="text-2xl font-semibold ">{username}</h1>
    <hr />
    </header>
    {/* Chat Messages */}
    <Messages receiverId = {friendId}></Messages>
    {/* Chat Input */}
    <SendMessage receiverId = {friendId}></SendMessage>
    
  </div>
  )
}

export default TextContainer