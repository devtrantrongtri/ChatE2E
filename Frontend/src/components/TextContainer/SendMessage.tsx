import React, { useEffect, useRef, useState } from 'react'
interface SendMessageProps {
  receiverId: string | undefined
}
const SendMessage : React.FC<SendMessageProps> = ({receiverId}) => {
  const [messageSent, setmessageSent] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    
  }, [messageSent]);

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    // Validation
    if (!messageSent ) {
      setStatus('Vui lòng nhập đầy đủ và đúng yêu cầu!');
      return;
    }

    // Send sign up request to the server
    const response = await fetch(`http://localhost:4041/messages/${receiverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ message: messageSent}),
    });

    if (response.ok) {
      setStatus('success');
      setmessageSent('');
      console.log(status)
    } else {
      // Handle Status
      setStatus('Không được để trống');
    }
  };

  
  return (
      <footer className="bg-slate-900  border-gray-300 p-4 absolute bottom-0 w-3/4">
    <div className="flex items-center">
        <input
          type="text"
          placeholder={`Type a message...`}
          className="text-white w-full p-2 rounded-md border bg-slate-900 border-gray-400 focus:outline-none focus:border-blue-500" value={messageSent} onChange={(e) => setmessageSent(e.target.value)}
        />
        <button onClick={handleSubmit}   className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
          Send
        </button>
      </div >
      </footer>
  )
}

export default SendMessage