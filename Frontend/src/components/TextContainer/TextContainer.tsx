import React from 'react'
import HeaderTextContainer from './HeaderTextContainer'
import Messages from './Messages'
import SendMessage from './SendMessage'
import Tittle from '../TittleApp/Tittle'

function TextContainer() {
  return (
    <div className="flex-1">
        <Tittle></Tittle>
    {/* Chat Header */}
    <HeaderTextContainer></HeaderTextContainer>
    {/* Chat Messages */}
    <Messages></Messages>
    {/* Chat Input */}
    <SendMessage></SendMessage>
    
  </div>
  )
}

export default TextContainer