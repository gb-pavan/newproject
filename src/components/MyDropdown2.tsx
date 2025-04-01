import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, LucideProps } from "lucide-react";
import DynamicIcon from "./DynamicIcon";

interface DropdownOption {
  label: string;
  value: string | number;
  icon?: string; // Icon name as string
  color?: string;
  addDeco?:boolean;
  showCheckbox?: boolean;
  id?:string
}

interface CustomDropdownProps {
  options: DropdownOption[];
  selectedValues?: string[] | string;
  onChange: (values: string[]) => void;
  multiSelect?: boolean;
  btnIcon?:string;
  defaultValue?:string;
}

const Icons: Record<string, React.FC<LucideProps>> = {
  check: Check,
  chevronDown: ChevronDown,
};

const CustomDropdown2: React.FC<CustomDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  multiSelect = false,
  btnIcon,defaultValue
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  console.log("options",options);

  useEffect(() => {
    const handleResize = () => {
      // You can adjust this threshold based on your layout needs
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Automatically select the first option if nothing is selected (only for single select)
  useEffect(() => {
    if (!multiSelect && selectedValues?.length === 0 && options.length > 0) {
      onChange([options[0].value.toLocaleString()]);
    }
  }, [multiSelect, selectedValues, options, onChange]);

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
    // let newValues = [...selectedValues];
    let newValues = [...(Array.isArray(selectedValues) ? selectedValues : selectedValues ? [selectedValues] : [])];


    if (multiSelect) {
      if (newValues.includes(value)) {
        newValues = newValues.filter((val) => val !== value);
      } else {
        newValues.push(value);
      }
    } else {
      newValues = [value];
      setIsOpen(false);
    }

    onChange(newValues);
  };

  // Display logic for button label
  // const displayText =
  //   multiSelect && selectedValues.length > 0
  //     ? `Selected (${selectedValues.length})`
  //     :defaultValue?.length > 0 ?defaultValue: options.find((opt) => opt.value === selectedValues[0])?.label;

  // const displayText =
  // multiSelect && selectedValues?.length > 0
  //   ? `Selected (${selectedValues?.length})`
  //   : typeof defaultValue === "string" && defaultValue.length > 0
  //   ? defaultValue
  //   : options.find((opt) => opt.value === selectedValues[0])?.label;
  const displayText =
  multiSelect && Array.isArray(selectedValues) && selectedValues.length > 0
    ? `Selected (${selectedValues.length})`
    : typeof defaultValue === "string" && defaultValue.length > 0
    ? defaultValue
    : Array.isArray(selectedValues)
    ? options.find((opt) => opt.value === selectedValues[0])?.label
    : options.find((opt) => opt.value === selectedValues)?.label;



  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Dropdown Button */}
      <button
        className="w-fit gap-2 flex justify-between items-center p-2 border rounded-md shadow-sm bg-white hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {defaultValue === 'Assignee' && <DynamicIcon name={btnIcon ?? "GoPerson"} className="text-gray-600" size={24} />}
        <span>{defaultValue === 'Assignee' && isSmallScreen ? '' : displayText}</span>
        <ChevronDown size={16} />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 right-0 w-fit mt-2 bg-white border rounded-md shadow-lg">
          {options.map((option) => {
            const IconComponent = option.icon ? Icons[option.icon] : null;
            const isSelected = selectedValues?.includes(option.value.toLocaleString());

            return (
              <li
                key={option.value.toLocaleString()}
                // onClick={() => handleSelect(option.value.toLocaleString())}
                // onClick={() => handleSelect(defaultValue === "Assignee" ? option.id : option.value)}
                onClick={() => handleSelect(defaultValue === "Assignee" ? option.id?.toString() ?? "" : option.value?.toString() ?? "")}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
              >
                {/* Optional Checkbox */}
                {option.showCheckbox && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4"
                  />
                )}

                {/* Dynamic Icon */}
                {IconComponent && <IconComponent size={16} />}

                {/* Color Box */}
                {option.color && (
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: option.color }}
                  ></span>
                )}

                {/* Label */}
                {option.addDeco &&<div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-medium">
                   {option.label.split(" ").map((n) => n[0].toUpperCase()).join("")}
                </div>}
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  {defaultValue === "Assignee" && <span className="text-sm">{option.value}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown2;






