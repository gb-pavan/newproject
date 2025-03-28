'use client';

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface Option {
  label: string;
  color: string;
}

interface DropdownProps {
  options: Option[];
  selectedOptions: string[];
  onSelect: (values: string[]) => void;
}

const MultiSelectDropdown: React.FC<DropdownProps> = ({ options, selectedOptions, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    const newSelections = selectedOptions.includes(value)
      ? selectedOptions.filter((selected) => selected !== value)
      : [...selectedOptions, value];

    onSelect(newSelections);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 text-[16px] font-[300] border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100"
      >
        {selectedOptions?.length > 0 ? `Selected (${selectedOptions?.length})` : "Status"}
        <FaChevronDown className="ml-2 text-gray-600" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute right-0 top-full mt-1 w-48 bg-white text-[16px] font-[300] border border-gray-300 rounded-md shadow-lg z-50">
          {options.map((option) => (
            <li
              key={option.label}
              // className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              className="px-4 py-2 hover:bg-gradient-to-r from-[#D029D8] to-[#519CDF] cursor-pointer flex items-center hover:text-white"
              onClick={() => handleSelect(option.label)}
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.label)}
                readOnly
                className="mr-2 cursor-pointer"
              />
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: option.color }}
              ></div>
              <span className="ml-2 text-gray-700 font-medium">
                {option.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;




