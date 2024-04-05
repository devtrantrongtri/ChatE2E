import React from "react";
import SideBar from "../SideBar/SideBar";
import TextContainer from "../TextContainer/TextContainer";
import HeaderSidebar from "../SideBar/HeaderSidebar";
import { CiLogout } from "react-icons/ci"; 

function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
        
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <HeaderSidebar></HeaderSidebar>
        {/*Side Bar Contact List */}
        <SideBar></SideBar>
      </div>
      
      {/* Main Chat Area */}
        <TextContainer></TextContainer>
    </div>
  );
}

export default Home;
