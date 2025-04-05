import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { default as CustomCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Filter, QueryState } from "@/interfaces/tableFilterTypes";
import { getDateRange } from "@/utils/helpers";
import { TimeRangeType } from "@/utils/constants/timeRanges";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateFilterProps {
  options: string[];
  setDate:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
  // onSelectionChange: (
  //   selectedOption: string,
  //   startDate?: Date,
  //   endDate?: Date
  // ) => void;
}

const DateFilter = ({ options, setDate }: DateFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!selectedOption) return; // Don't execute if selectedOption is not defined
  //   console.log("selected date",selectedOption);

  //   const dateRange = getDateRange(selectedOption as TimeRangeType);
  //   console.log("date range",dateRange);
  //   const { startDate, endDate } = dateRange;

  //   setDate((prev) => {
  //     const updatedFilters = prev.filters.filter(f => f.field !== "createdAt"); // Remove old "createdAt" filter

  //     return {
  //       ...prev,
  //       filters: [
  //         ...updatedFilters, // Ensure only one "createdAt" filter exists
  //         {
  //           field: "createdAt",
  //           operator: "BETWEEN",
  //           value: startDate && endDate ? [startDate.toISOString(), endDate.toISOString()] : [],
  //         } as Filter,
  //       ],
  //     };
  //   });
  // }, [selectedOption,setDate]);

  useEffect(() => {
  if (!selectedOption || selectedOption === "Custom Date") return;

  console.log("selected date", selectedOption);

  const dateRange = getDateRange(selectedOption as TimeRangeType);
  console.log("date range", dateRange);
  const { startDate, endDate } = dateRange;

  setDate((prev) => {
    const updatedFilters = prev.filters.filter(f => f.field !== "createdAt");

    return {
      ...prev,
      filters: [
        ...updatedFilters,
        {
          field: "createdAt",
          operator: "BETWEEN",
          value: startDate && endDate ? [startDate.toISOString(), endDate.toISOString()] : [],
        } as Filter,
      ],
    };
  });
}, [selectedOption, setDate]);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedOption(null);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionChange = (option: string) => {
    console.log("option date",option);
    setSelectedOption(option);
    setIsOpen(option === "Custom Date");
  };

  const handleDateChange = (update: Value) => {
    console.log('update date',update);
    if (Array.isArray(update) && update.length === 2) {
      setDateRange(update as [Date | null, Date | null]);
      if (update[0] && update[1]) {
        // onSelectionChange("Custom Date", update[0], update[1]);

        setDate((prev) => {
          const updatedFilters = prev.filters.filter(f => f.field !== "createdAt"); // Remove old "createdAt" filter

          return {
            ...prev,
            filters: [
              ...updatedFilters, // Keep only filters that are not "createdAt"
              {
                field: "createdAt",
                operator: "BETWEEN",
                value: [update[0]?.toISOString(), update[1]?.toISOString()], // Use 'update' instead of 'startDate' and 'endDate'
              } as Filter,
            ],
          };
        });
      }
    }
  };


  const handleDropdownToggle = () => {
    if (selectedOption === "Custom Date" && isOpen) {
      setSelectedOption(null);
      setDateRange([null, null]);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center px-4 py-2 text-gray-600 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
      >
        {selectedOption
          ? selectedOption === "Custom Date" && startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : selectedOption
          : "All"}
        <FaChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className={`absolute ${selectedOption === 'Custom Date' ? 'right-20' : 'right-0'} w-40 bg-white border border-gray-200 rounded-md shadow-md mt-2 z-50`}>
          {selectedOption === "Custom Date" ? (
            // <div className="p-4 w-full">
            //   <CustomCalendar
            //     selectRange
            //     value={dateRange || [null, null]}
            //     onChange={handleDateChange}
            //     className="w-full border rounded-md p-2"
            //   />
            // </div>
            <div className="p-4 w-[400px]"> {/* Adjust width here */}
  <CustomCalendar
    selectRange
    value={dateRange || [null, null]}
    onChange={handleDateChange}
    className="w-full border rounded-md p-2"
  />
</div>

          ) : (
            <ul className="py-2">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gradient-to-r from-[#D029D8] to-[#519CDF] hover:text-white"
                  onClick={() => handleOptionChange(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DateFilter;

