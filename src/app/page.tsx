'use client';
import React, { useState } from "react";
import CustomDropdown2 from "@/components/MyDropdown2";

const DropdownExample: React.FC = () => {
  // State management for different dropdown instances
  const [selectedSingle, setSelectedSingle] = useState<string[]>([]);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [selectedWithIcons, setSelectedWithIcons] = useState<string[]>([]);
  const [selectedWithCheckbox, setSelectedWithCheckbox] = useState<string[]>([]);
  const [selectedWithColor, setSelectedWithColor] = useState<string[]>([]);

  // Dropdown options
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const optionsWithIcons = [
    { label: "Home", value: "home", icon: "check" },
    { label: "Settings", value: "settings", icon: "chevronDown" },
    { label: "Profile", value: "profile", icon: "check" },
  ];

  const optionsWithCheckbox = [
    { label: "Red", value: "red", showCheckbox: true },
    { label: "Green", value: "green", showCheckbox: true },
    { label: "Blue", value: "blue", showCheckbox: true },
  ];

  const optionsWithColor = [
    { label: "Apple", value: "apple", color: "red" },
    { label: "Banana", value: "banana", color: "yellow" },
    { label: "Grape", value: "grape", color: "purple" },
  ];
  console.log("selectsingle",selectedSingle);

  return (
    <div className="space-y-4">
      <h2>Single Select</h2>
      <CustomDropdown2 options={options} selectedValues={selectedSingle} onChange={setSelectedSingle} />

      <h2>Multi Select</h2>
      <CustomDropdown2 options={options} selectedValues={selectedMulti} onChange={setSelectedMulti} multiSelect />

      <h2>With Icons</h2>
      <CustomDropdown2 options={optionsWithIcons} selectedValues={selectedWithIcons} onChange={setSelectedWithIcons} />

      <h2>With Checkboxes</h2>
      <CustomDropdown2 options={optionsWithCheckbox} selectedValues={selectedWithCheckbox} onChange={setSelectedWithCheckbox} multiSelect />

      <h2>With Colors</h2>
      <CustomDropdown2 options={optionsWithColor} selectedValues={selectedWithColor} onChange={setSelectedWithColor} />
    </div>
  );
};

export default DropdownExample;










