'use client';
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import Image from 'next/image';
import ClipLoader from 'react-spinners/ClipLoader';
import { BsAlarm } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router

export interface IProfileHeaderProps {
  toggleSidebar: () => void;
  incentive: number | undefined;
}

function Header({ toggleSidebar, incentive }: IProfileHeaderProps) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const router = useRouter();

  const handleMobileMenuClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    toggleSidebar();
  };

  const handleProfileClick = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleLogout = async () => {
    localStorage.clear();
    await fetch("/api/logout", {
    method: "POST",
    credentials: "include", // Ensures cookies are handled correctly
  });
    router.push('/login');
  }

  return (
    <div className="flex items-center border-b border-gray-300 dark:invert h-[60px]">
      
      <div className="hidden md:flex justify-center h-full items-center">
        <Image src="/logox.svg" alt="logo" priority width={250} height={60} className="h-full" />
      </div>
      <div className="flex justify-between items-center border-l h-[60px] w-full px-2">
        <div className="flex items-center text-lg font-medium gap-x-4">
          <IoMenu size={30} onClick={handleMobileMenuClick} className="cursor-pointer md:hidden" />
          <p>Incentive</p>
          {incentive === undefined ? (
            <ClipLoader />
          ) : (
            <span className="text-xl text-purple-700">INR {incentive}</span>
          )}
        </div>
        <div className="relative flex items-center space-x-4">
          <BsAlarm size={28} />
          <IoIosNotificationsOutline size={28} />
          <Image src="/Ellipse.svg" alt="profile-image" width={100} height={100} className="cursor-pointer h-12 w-12 rounded-full dark:invert" onClick={handleProfileClick} />
          {isMenuVisible && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-40">
              <div className="p-2 cursor-pointer text-gray-800 hover:bg-gray-100" >
                Profile
              </div>
              <div className="p-2 cursor-pointer text-gray-800 hover:bg-gray-100" onClick={handleLogout} >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;





