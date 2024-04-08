'use client'
import React, { useEffect, useState } from 'react'
import HeaderTextContainer from './HeaderTextContainer'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Tittle from '../TittleApp/Tittle'

interface ChatProps {
  receiverId: string | undefined
}


const TextContainer : React.FC<ChatProps> = ({receiverId}) => {
  const [friendId, setFriendId] = useState<string | undefined>(receiverId);
  useEffect(() => {
    // Update friendId when receiverId from props changes
    setFriendId(receiverId);
  }, [receiverId]);
  return (
    <div className="flex-1">
    <Tittle></Tittle>
    {/* Chat Header */}
    <HeaderTextContainer></HeaderTextContainer>
    {/* Chat Messages */}
    <Messages receiverId = {friendId}></Messages>
    {/* Chat Input */}
    <SendMessage></SendMessage>
    
  </div>
  )
}

export default TextContainer