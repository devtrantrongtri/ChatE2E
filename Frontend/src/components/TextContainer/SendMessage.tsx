import { useSocketContext } from "@/context/SocketContext";
import { getEncryptedMessage } from "@/E2E/encryptMessage";
import { getSharedKey } from "@/E2E/getShareKey";
import React, { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";

interface SendMessageProps {
  receiverId: string | undefined;
  updateMessages: () => void; // Function to update messages
}

const SendMessage: React.FC<SendMessageProps> = ({ receiverId, updateMessages }) => {
  const [messageSent, setMessageSent] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();
   // Listen for messageSentSignal from server
   useEffect(() => {
    if (socket) {
      socket.on("updateMessageSignal", () => {
        updateMessages(); // Update messages when messageSentSignal is received
      });
    }
    return () => {
      if (socket) {
        socket.off("updateMessageSignal"); // Clean up event listener when component unmounts
      }
    };
  }, [socket, updateMessages]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!messageSent) {
        setStatus("Vui lòng nhập đầy đủ và đúng yêu cầu!");
        return { status };
      }
      setLoading(true);

      // Encrypt Message
      const sharedKey = await getSharedKey(receiverId);
      const encryptedMessage =  getEncryptedMessage(sharedKey,messageSent)
      console.log("sharedKey:",sharedKey);
      const response = await fetch(
        `http://localhost:4041/messages/${receiverId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: encryptedMessage }),
        }
      );
      socket?.emit("messageSentSignal");
      setLoading(false);
      if (response.ok) {
        setStatus("success");
        setMessageSent("");
        updateMessages(); // Update messages after sending a message
      } else {
        setStatus("Không được để trống");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <footer className="bg-slate-900  border-gray-300 p-4 absolute bottom-0 w-3/4">
      <div className="flex items-center">
        <input
          type="text"
          placeholder={`Type a message...`}
          className="text-white w-full p-2 rounded-md border bg-slate-900 border-gray-400 focus:outline-none focus:border-blue-500"
          value={messageSent}
          onChange={(e) => setMessageSent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-400 active:blur-sm"
        >
          {loading ? (
            <div className='animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status'></div>
          ) : (
            <BsFillSendFill />
          )}
        </button>
      </div>
    </footer>
  );
};

export default SendMessage;


// import React, { useEffect, useRef, useState } from "react";
// import { BsFillSendFill } from "react-icons/bs";
// interface SendMessageProps {
//   receiverId: string | undefined;
// }
// const SendMessage: React.FC<SendMessageProps> = ({ receiverId }) => {
//   const [messageSent, setmessageSent] = useState("");
//   const [status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//       // Validation
//       if (!messageSent) {
//         setStatus("Vui lòng nhập đầy đủ và đúng yêu cầu!");
//         return { status };
//       }else{
//         return messageSent
//       }
//   };

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         if (messageSent) {
//           setLoading(true);
//           const response = await SendMessage(receiverId, messageSent)
//           setLoading(false);
//           if (response === null) {
            
//           } else {
            
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     }
//     fetchMessage();

//   },[]);

//   return (
//     <footer className="bg-slate-900  border-gray-300 p-4 absolute bottom-0 w-3/4">
//       <div className="flex items-center">
//       {/* xử lý loading khi fetch to database */}
//         <input
//           type="text"
//           placeholder={`Type a message...`}
//           className="text-white w-full p-2 rounded-md border bg-slate-900 border-gray-400 focus:outline-none focus:border-blue-500"
//           value={messageSent}
//           onChange={(e) => setmessageSent(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSubmit(e);
//             }
//           }}
//         />

//         <button
//           onClick={handleSubmit}
//           className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-indigo-400 active:blur-sm"
//         >
//           {loading ? (
//             <div className='animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status'></div>
//           ) : (
//             <BsFillSendFill />
//           )}
//         </button>
//       </div>
//     </footer>
//   );
// };

// export default SendMessage;