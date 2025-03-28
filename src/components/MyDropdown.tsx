'use client';
import React, { useState, ReactNode, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  iconColor?: string;
}

interface MyDropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  placeholder?: string;
  icon?: ReactNode;
  onSelect?: (value: string) => void;
  className?: string;
}

const MyDropdown: React.FC<MyDropdownProps> = ({
  options,
  defaultValue,
  placeholder = 'Select',
  icon,
  onSelect,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    if (onSelect) onSelect(option.value);
  };

  const getSelectedOption = () => {
    return options.find(option => option.value === selectedValue);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.dropdown-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative dropdown-container">
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white hover:bg-gray-50 ${className}`}
      >
        {getSelectedOption() ? (
          <>
            {getSelectedOption()?.icon}
            {getSelectedOption()?.label}
          </>
        ) : (
          <>
            {icon}
            {placeholder}
          </>
        )}
        <FaChevronDown className="h-2 w-2 ml-1" />
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {/* Checkmark for selected item */}
                <span className="w-4 h-4 mr-1 flex items-center justify-center">
                  {selectedValue === option.value && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                
                {/* Icon */}
                {option.icon && (
                  <span className={option.iconColor ? option.iconColor : ''}>
                    {option.icon}
                  </span>
                )}
                
                {/* Label */}
                <span className="ml-2">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDropdown;