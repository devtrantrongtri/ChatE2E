"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/utils/getUser";
import { useRouter } from "next/navigation";
import HeaderSidebar from "@/components/SideBar/HeaderSidebar";
import TextContainer from "@/components/TextContainer/TextContainer";
import { SocketContextProvider } from "@/context/SocketContext";
import { AuthContextProvider } from "@/context/AuthenContext";

interface User {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string;
  receiverId?: string;
  // Add other properties if necessary
}

export default function ChatComponents({
  params,
}: {
  params: { userid: string };
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [friendId, setFriend] = useState<string>();
  const [username, setUsername] = useState<string>("Xin chào !");
  const [userAvartar, setuserAvartar] = useState<string>(
    "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
  );
  const [selectedSidebar, setSelectedSidebar] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let fetchUsers = async () => {
      try {
        let userList = await getAllUsers(params.userid);
        setUsers(userList);
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    };
    fetchUsers();
  }, [users]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <HeaderSidebar username={""}></HeaderSidebar>

        {/*Side Bar Contact List */}
        <div className="overflow-y-auto bg-slate-950 h-screen p-3 mb-9 pb-20">
          {users.map((user) => (
            <div
              onClick={() => {
                setSelectedSidebar(user._id),
                  setFriend(user._id),
                  setUsername(user.username),
                  setuserAvartar(user.avatarUrl);
              }}
              key={user._id}
              typeof="checkbox"
              className={` flex items-center  mb-4 cursor-pointer text-white hover:text-black hover:bg-gray-400 active:bg-gray-50  p-2 rounded-md  ${
                selectedSidebar === user._id ? "bg-gray-400 " : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full mr-3 ">
                <img
                  src={
                    user.avatarUrl
                      ? user.avatarUrl
                      : `https://placehold.co/200x/FFFAF0/0A0A0A.svg?text=${user.username
                          .charAt(0)
                          .toUpperCase()}&font=Lato`
                  }
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full "
                />
              </div>
              <div className="flex-1  ">
                <h2 className="text-lg   font-semibold">{user.username}</h2>
                {/* <p className="text-gray-600">**********</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <AuthContextProvider>
        <SocketContextProvider>
          <TextContainer
            username={username}
            receiverId={friendId}
          ></TextContainer>
        </SocketContextProvider>
      </AuthContextProvider>
    </div>
  );
}
