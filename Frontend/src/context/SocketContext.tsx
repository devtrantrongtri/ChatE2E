import { useEffect, useState,createContext, useContext } from "react";
import { useAuthContext } from "./AuthenContext";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

// const SocketContext = createContext<any>(null);
const SocketContext = createContext<{ socket: Socket | null; onlineUsers: any[] }>({
  socket: null,
  onlineUsers: [],
});

//hook
export const useSocketContext = () => {
  return useContext(SocketContext);
};


export const SocketContextProvider:  React.FC<{ children: React.ReactNode }> = ({children}) => {
  const[socket,setSocket] = useState<Socket | null>(null);
  const [onlineUsers,setOnlineUsers] = useState<any[]>([]);
  const {authUser} = useAuthContext()
  // useEffect(() => {
  //   if(authUser) {
  //     const socket = io("http://localhost:4041",{
  //       query:{
  //         userId : authUser.user.userId,
  //       },
  //     })

  //     setSocket(socket)

  //     return () => socket.close();
  //   }else{
  //     if(socket) {
  //       socket.close();
  //       setSocket(null);
  //     }
  //   }
  // },[]);
  useEffect( () : any => {
    console.log("authen",authUser);
		if (authUser) {
			const socket = io("http://localhost:4041", {
				query: {
					userId: authUser.user.userId,
				},
		
      });
			setSocket(socket);
      // console.log(socket)
			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUser", (users) => { // mình mất 4 tiếng vì getOnlineUser thừa một chữ s, cuộc sống :)))
				setOnlineUsers(users);
        // console.log(onlineUsers)
        // console.log("users:",users)
        socket.on("newMessage", () => {
          
        })
			});

			return () => socket.close();
      
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
    // console.log("onlineUsers:", onlineUsers);
	}, [authUser]);
  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
}




// import React, { createContext, useContext, useEffect, useState } from 'react';
// import io from 'socket.io-client';

// // Tạo context cho kết nối socket @
// const SocketContext = createContext<any>(null);

// // Hook để sử dụng context kết nối socket
// export const useSocketContext = () => useContext(SocketContext);

// // Component cung cấp context kết nối socket cho toàn bộ ứng dụng @
// export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [socket, setSocket] = useState<any>(null);

//   useEffect(() => {
//     // Tạo kết nối socket
//     const newSocket = io('http://localhost:4041'); // Thay đổi URL socket theo cấu hình của bạn ( server)
//     setSocket(newSocket);

//     // Đóng kết nối khi unmount
//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };
