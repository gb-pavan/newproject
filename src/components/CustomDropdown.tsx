'use client';
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  selectedOption?: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn flex items-center justify-between bg-white shadow-sm"
        style={{ color: "#64748B", padding: "0px 10px", border: "1px solid #d6d2d2", borderRadius: "8px", height: "40px", fontSize: "14px", fontWeight: "400", }}
      >
        {selectedOption ? options.find((opt) => opt.value === selectedOption)?.label : "Select an option"}
        <span className="ml-2">
          <FaChevronDown className="down-arrow" style={{ cursor: "pointer", color: "#64748B", fontSize: "16px" }} />
        </span>
      </button>

      {isOpen && (
        <ul className="style-list absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="each-status px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
              style={{ padding: "10px", display: "flex", justifyContent: "flex-start", alignItems: "center" }}
            >
              <IoMdPerson />{option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
