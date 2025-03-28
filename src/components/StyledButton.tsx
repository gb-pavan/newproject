import React from "react";
import { IconType } from "react-icons";
import * as Icons from "react-icons/fa"; // You can change the library as needed

interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => {
  const IconComponent = (Icons as Record<string, IconType>)[icon] || Icons.FaRegClock;
  
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-5 border-2 border-[#CB2EE3] rounded-full text-black text-[18px] hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      <IconComponent size={20} />
      <span>{label}</span>
    </button>
  );
};

export default IconButton;


