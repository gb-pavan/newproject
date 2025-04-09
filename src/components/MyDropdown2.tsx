import React, { useState, useRef, useEffect, useMemo } from "react";
import { Check, ChevronDown, LucideProps } from "lucide-react";
import DynamicIcon from "./DynamicIcon";
import SearchBox from "./SearchBox";
import FilterChips from "./FilterChips";

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
  const [filteredOptions, setFilterOptions] = useState("");

  // const filteringOptions = options.filter(option =>
  //   option.label.toLowerCase().includes(filteredOptions.toLowerCase())
  // );
  // const filteringOptions = useMemo(() => {
  //   return options.filter(option =>
  //     option.label.toLowerCase().includes(filteredOptions.toLowerCase())
  //   );
  // }, [options, filteredOptions]);

  const handleSelectionChange = (selected: string[]) => {
    console.log("Selected Roles:", selected);
  };

  const filteringOptions = useMemo(() =>
    options?.filter(option =>
      option.label?.toLowerCase().includes(filteredOptions.toLowerCase()) ||
      option.value?.toString().toLowerCase().includes(filteredOptions.toLowerCase())
    ), [options, filteredOptions]
  );




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
        {/* <span>{defaultValue === 'Assignee' && isSmallScreen ? '' : ''}</span> */}
        <span>{defaultValue === 'Active' ? selectedValues :''}</span>
        {/* <span>{defaultValue?.length && defaultValue}</span> */}
        <ChevronDown size={16} />
      </button>


      {/* Dropdown List */}
      {/* {isOpen && (
        <ul className={`absolute z-10 right-0 mt-2 border ${defaultValue === 'Status' ? '' : 'w-fit'} rounded-md shadow-lg bg-white overflow-y-auto`} style={{ width: defaultValue === 'Status' ? '10.5rem' : undefined,maxHeight: '250px', }}>
          {options.map((option) => {
            const IconComponent = option.icon ? Icons[option.icon] : null;
            const isSelected = selectedValues?.includes(option.value.toLocaleString());

            return (
              <li
                key={option.label.toLocaleString() + option.color + option.id}
                // onClick={() => handleSelect(option.value.toLocaleString())}
                // onClick={() => handleSelect(defaultValue === "Assignee" ? option.id : option.value)}
                onClick={() => handleSelect(defaultValue === "Assignee" ? option.id?.toString() ?? "" :defaultValue === "AssignTo" ? option.id?.toString() ?? "": option.value?.toString() ?? "")}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
              >
                {option.showCheckbox && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4"
                  />
                )}

                {IconComponent && <IconComponent size={16} />}

                {option.color && (
                  <span
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: option.color }}
                  ></span>
                )}

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
      )} */}
      {isOpen && (
  <div
    className={`absolute z-10 right-0 mt-2 border rounded-md shadow-lg bg-white`}
    style={{
      width: defaultValue === "Status" ? "10.5rem" : defaultValue === "Assignee" ? "16rem" : undefined,
    }}
  >

    <div className="m-4 space-y-2">
      {(defaultValue === 'Assignee' || defaultValue ==='Status' || defaultValue === 'AssignTo') && <SearchBox
          iconSize={32}
          placeholder="Search"
          iconColor="#0D2167"
          responsive={false}
          setFilterOptions={setFilterOptions}
          // setFilter={setQuery}
        />}
        {defaultValue === 'AssignTo' && <FilterChips onSelectionChange={handleSelectionChange} />}
    </div>
    {/* Scrollable container for search and list */}
    <div className="max-h-64 overflow-y-auto p-2">
      
      <ul>
        {filteringOptions.map((option) => {
          const IconComponent = option.icon ? Icons[option.icon] : null;
          const isSelected = selectedValues?.includes(option.value.toLocaleString());

          return (
            <li
              key={option.label.toLocaleString() + option.color + option.id}
              onClick={() =>
                handleSelect(
                  defaultValue === "Assignee"
                    ? option.id?.toString() ?? ""
                    : defaultValue === "AssignTo"
                    ? option.id?.toString() ?? ""
                    : option.value?.toString() ?? ""
                )
              }
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
            >
              {option.showCheckbox && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="w-4 h-4"
                />
              )}
              {IconComponent && <IconComponent size={16} />}
              {option.color && (
                <span
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: option.color }}
                ></span>
              )}
              {option.addDeco && (
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-medium">
                  {option.label
                    .split(" ")
                    .map((n) => n[0].toUpperCase())
                    .join("")}
                </div>
              )}
              <div className="flex flex-col">
                <span>{option.label}</span>
                {defaultValue === "Assignee" && (
                  <span className="text-sm">{option.value}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
)}



    </div>
  );
};

export default CustomDropdown2;






