import React, { useEffect, useState } from "react";
import { RiSettings2Line } from "react-icons/ri";
import { TbBriefcase, TbClipboardText } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { RxShuffle, RxDashboard } from "react-icons/rx";
import { BiPieChartAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { TbLogout } from "react-icons/tb";



export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

function Sidebar({ isOpen, toggleSidebar, isMobile }: SidebarProps) {
  const [hovered, setHovered] = useState(false);
  const [clickedItem, setClickedItem] = useState("/dashboard/home");
  const [mounted, setMounted] = useState(false);
  const [devDropdownOpen, setDevDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const router = useRouter();


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleMouseEnter = () => setTimeout(() => setHovered(true), 100);
  const handleMouseLeave = () => setTimeout(() => setHovered(false), 100);

  const handleItem = (item: string, e?: React.SyntheticEvent) => {
    if (item === '/dashboard/developers'){
      setDevDropdownOpen(true);
      if (e) {
        setDropdownPosition(e.currentTarget.getBoundingClientRect());
      }
      setClickedItem(item);
      return;
    }
    router.push(item)
    setClickedItem(item);
    if (isMobile) toggleSidebar();
  };


  return (
    <div
      className={`${isMobile ? "fixed top-0 left-0 h-full z-50 bg-white dark:bg-black" : "h-[calc(100vh-60px)]"} transition-all duration-300 overflow-hidden border-r border-gray-300 shadow-lg
        ${isMobile ? (isOpen ? "w-64 block" : "hidden") : hovered || isOpen ? "w-[252px]" : "w-20"} md:block`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Logo and Close Button */}
        {isOpen && (
          <div className="flex items-center justify-between p-4 border-b">
            <Image src="/logo.svg" alt="logo" className="h-10 w-auto" width={100} height={100} />
            {isMobile && <IoClose size={30} onClick={toggleSidebar} className="cursor-pointer dark:invert" />}
          </div>
        )}

        {/* Main Menu Items */}
        <ul className="flex flex-col items-left justify-left flex-1 dark:invert">
          {[
            { icon: <RxDashboard size={30} />, path: "/dashboard/home", label: "Home" },
            { icon: <TbClipboardText size={30} />, path: "/dashboard/table", label: "Leads Management" },
            { icon: <BiPieChartAlt2 size={30} />, path: "/dashboard/form", label: "Create Form" },
            { icon: <TbBriefcase size={30} />, path: "stores", label: "Stores" },
            { icon: <BsHeadset size={30} />, path: "/dashboard/home2", label: "Home2" },
            { icon: <RiSettings2Line size={30} />, path: "/dashboard/developers", label: "Developers" },
            { icon: <RxShuffle size={30} />, path: "workflows", label: "Workflows" },
          ].map((item, index) => (
            <li
              key={index}
              onClick={(e) => handleItem(item.path,e)}
              className={`flex ${hovered?'':'justify-center'} items-center gap-4 min-h-[60px] px-4 cursor-pointer transition-colors duration-300
                ${clickedItem === item.path
                  ? "bg-[#FBE8FF] text-[#D029D8] font-semibold"
                  : "hover:bg-gradient-to-r from-[#D029D8] to-[#519CDF] hover:text-white"
                }`}
            >
              {item.icon}
              {(hovered || isOpen) && <span className="whitespace-nowrap">{item.label}</span>}
            </li>
          ))}
          {devDropdownOpen && clickedItem === "/dashboard/developers" && (
              <ul className={`absolute z-40 w-40 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-md overflow-hidden`}   style={{ top: `${dropdownPosition.top}px`, left: `80px` }}
>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleItem("/dashboard/team")}
                >
                  Team
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleItem("/dashboard/stages")}
                >
                  Lead Stage
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleItem("/dashboard/fields")}
                >
                  Lead Field
                </li>
              </ul>
            )}
        </ul>
       
        <div
          onClick={() => handleItem("/dashboard/home")}
          className={`flex justify-start items-start space-x-4 min-h-[60px] px-4 cursor-pointer transition-colors duration-300
            ${clickedItem === "/dashboard/logout"
              ? "bg-[#FBE8FF] text-[#D029D8] font-semibold"
              : "hover:bg-gradient-to-r from-[#D029D8] to-[#519CDF] hover:text-white"
            }`}
        >
          <TbLogout size={30} />
          {(hovered || isOpen) && <span className="whitespace-nowrap">Log out</span>}
        </div>

        <ThemeToggle hovered={hovered} />
        {(hovered || isOpen) && (
          <div className="flex justify-center p-4">
            <Image
              src="/sideImg.svg"
              alt="sidebar image"
              width={180}
              height={38}
              priority
            />
          </div>
        )}
        <div className="flex justify-center align-center border-t gap-x-2 mb-8 p-2 dark:invert">
          <Image
            className="dark:invert"
            src="/sideProfImg.svg"
            alt="sidebar profile image"
            width={40}
            height={40}
            priority
          />
          {(hovered || isOpen) && (
            <div className="flex flex-col justify-between">
              <p>Welcome Back</p>
              <p>Jonathan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


