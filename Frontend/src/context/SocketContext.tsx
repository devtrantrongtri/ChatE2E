import { useEffect, useState, createContext, useContext } from "react";
import { useAuthContext } from "./AuthenContext";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

// Tạo context để chia sẻ thông tin về socket và danh sách người dùng trực tuyến
const SocketContext = createContext<{
  socket: Socket | null;
  onlineUsers: any[];
}>({
  socket: null,
  onlineUsers: [],
});

// Hook để sử dụng context trong các component con
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// Component cung cấp context cho các component con
export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State để lưu trữ đối tượng socket và danh sách người dùng trực tuyến
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  // Sử dụng context để lấy thông tin về người dùng đã xác thực
  const { authUser } = useAuthContext();

  // Sử dụng useEffect để thiết lập kết nối với server socket khi người dùng đã xác thực
  useEffect((): any => {
    // Kiểm tra xem người dùng đã xác thực chưa
    if (authUser) {
      // Tạo kết nối socket với server, truyền userId của người dùng đã xác thực
      const socket = io("http://localhost:4041", {
        query: {
          userId: authUser.user.userId,
        },
      });
      // Lưu trữ đối tượng socket vào state
      setSocket(socket);

      // Lắng nghe sự kiện "getOnlineUser" từ server để cập nhật danh sách người dùng trực tuyến
      socket.on("getOnlineUser", (users) => {
        setOnlineUsers(users);
        // Lắng nghe sự kiện "newMessage" từ server
        socket.on("newMessage", () => {});
      });

      // Trả về một hàm để đóng kết nối socket khi component unmount
      return () => socket.close();
    } else {
      // Nếu không có người dùng xác thực, đóng kết nối socket nếu có
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  // Trả về context chứa thông tin về socket và danh sách người dùng trực tuyến
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};



// import { useEffect, useState, createContext, useContext } from "react";
// import { useAuthContext } from "./AuthenContext";
// import io from "socket.io-client";
// import { Socket } from "socket.io-client";

// // const SocketContext = createContext<any>(null);
// const SocketContext = createContext<{
//   socket: Socket | null;
//   onlineUsers: any[];
// }>({
//   socket: null,
//   onlineUsers: [],
// });

// //hook
// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
//   const { authUser } = useAuthContext();
//   useEffect((): any => {
//     console.log("authen", authUser);
//     if (authUser) {
//       const socket = io("http://localhost:4041", {
//         query: {
//           userId: authUser.user.userId,
//         },
//       });
//       setSocket(socket);
//       socket.on("getOnlineUser", (users) => {
//         setOnlineUsers(users);

//         socket.on("newMessage", () => {});
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);
//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
