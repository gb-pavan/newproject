import { Filter, IAssignee, QueryState } from "@/interfaces/tableFilterTypes";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";

interface DropdownProps {
  users: IAssignee[];
  selectAssignee:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({ users,selectAssignee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IAssignee | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle viewport size changes
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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserSelection = (user: IAssignee) => {
    setSelectedUser(user);
    setIsOpen(false);
    selectAssignee((prev) => ({
      ...prev,
      filters: [
        ...prev.filters.filter((filter) => filter.field !== "Assignee"),
        {
          field: "Assignee",
          operator: "IN",
          value: [selectedUser?._id],
        } as Filter,
      ],
    }));
  };

  return (
    <div ref={dropdownRef} className="relative">

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center px-2 py-2 bg-white border rounded-md shadow-sm focus:outline-none transition-all"
      >
        <GoPerson className="text-gray-600" size={24} />
        {!isSmallScreen && (
          <>
            <span className="ml-2 mr-1">
              {selectedUser ? selectedUser.name : "Assignee"}
            </span>
            
          </>
        )}<FaChevronDown className="w-[1em] h-[1em] ml-1" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 min-w-full w-max bg-white border rounded-md shadow-lg z-50">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleUserSelection(user)}
            >
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-medium">
                {user.name.split(" ").map((n) => n[0].toUpperCase()).join("")}
              </div>
              <span className="ml-2 text-sm text-gray-800 text-[14px]">{user.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
