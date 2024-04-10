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
  }, [receiverId,setFriendId]);
  return (
    <div className="flex-1">
    <Tittle></Tittle>
    {/* Chat Header */}
    <header className="bg-slate-900  text-gray-700 border-b">
    {/* <img className='round-full' src={avartar ? avartar : `https://placehold.co/200x/ffa8e4/ffffff.svg?text=-.-&font=Lato`} alt="avartar" /> */}
    <h1 className="text-2xl text-gray-200 p-5  font-bold">{username}</h1>
    
    </header>
    {/* Chat Messages */}
    <Messages receiverId = {friendId} username={username}></Messages>
    {/* Chat Input */}
    <SendMessage receiverId = {friendId}></SendMessage>
    
  </div>
  )
}

export default TextContainer