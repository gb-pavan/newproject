import React, { useState } from "react";
import { IoFunnelOutline } from "react-icons/io5";
interface FilterChipsProps {
  onSelectionChange: (selected: string[]) => void;
}

const roles = ["Root", "Admin", "Manager", "Caller", "Marketing_user"];

const FilterChips: React.FC<FilterChipsProps> = ({ onSelectionChange }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const toggleRole = (role: string) => {
    const updated = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(updated);
    onSelectionChange(updated);
  };

  return (
    <div className="flex items-center space-x-2">
      <IoFunnelOutline className="w-5 h-5 text-gray-500" />
      {roles.map((role) => {
        const isSelected = selectedRoles.includes(role);
        return (
          <button
            key={role}
            onClick={() => toggleRole(role)}
            className={`px-3 py-1 border rounded-full text-sm transition-colors duration-200 ${
              isSelected
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {role}
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
