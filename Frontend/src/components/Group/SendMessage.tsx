import { useSocketContext } from '@/context/SocketContext';
import React, { useEffect, useState } from 'react';

interface SendMessageProps {
    receiverId: string 
    senderId: string 
    groupName: string
    handleUpdateMessageTrigger :() => void
}
const SendMessageInGroup:React.FC<SendMessageProps> = ({ receiverId, senderId,groupName ,handleUpdateMessageTrigger}) => {
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();

  const sendMessage = async () => {
    if (message.trim() === '') return;
    setLoading(true);
    setMessageSent(message);


    try {
      // const response = await fetch(`http://localhost:4041/messages/group/${groupName}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify({ receiverId, senderId, message }),
      // });
      // const data = await response.json();
      const data = {receiverId, senderId, message,groupName,success : true}
      if (data.success) {
        // Xử lý khi gửi tin nhắn thành công (ví dụ: cập nhật danh sách tin nhắn)
        // handleUpdateMessageTrigger(); // Cập nhật danh sách tin nhắn
      socket?.emit("groupMessage", data);
        setMessage(''); // Xóa nội dung tin nhắn sau khi gửi
      } else {
        console.error('Failed to send message:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      // console.log('hàm này được gọi');
      setLoading(false);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div className="relative flex">
        <span className="absolute inset-y-0 flex items-center">
          <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </span>
        <input
          type="text"
          placeholder="Write your message!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            onClick={sendMessage}
            // disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm0 1.333a6.667 6.667 0 1 0 0 13.334A6.667 6.667 0 0 0 12 5.333zM11 7h2v6h-2zm0 8h2v2h-2z" />
              </svg>
            ) : (
              <>
                <span className="font-bold">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageInGroup;
