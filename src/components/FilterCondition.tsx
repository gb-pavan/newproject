import React, { useState } from "react";
import { Select, MenuItem, IconButton, SelectChangeEvent,CircularProgress } from "@mui/material";
import { CalendarToday, Close } from "@mui/icons-material";
import { Filter, QueryState } from "@/interfaces/tableFilterTypes";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { FilterInstance } from "@/services/tableFilter.service";

interface FilterComponentProps {
  label: string;
  setFiltering:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
  onClose: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ label,setFiltering, onClose }) => {
  
  const [condition, setCondition] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCondition(event.target.value);
    if (dateFilter === '') return;
    setFiltering((prev) => ({
      ...prev,
      filters: [
        ...prev.filters,
        { field: label, operator: condition, value: [condition] }
      ]
    }));
  };

  const handleDateChange = (event: SelectChangeEvent<string>) => {
    setDateFilter(event.target.value);
    if (dateFilter === '') return;
    setFiltering((prev) => ({
      ...prev,
      filters: [
        ...prev.filters,
        {
          field: label,
          operator: condition,
          value: [dateFilter],
        } as Filter, // Ensure the new object matches the Filter type
      ],
    }));
  };

  const handleColumnData = async () => {
    setLoading(true);
    try {
      const response = await FilterInstance.getColumnData();
      // const data = await response.json();
      setOptions(response);
    } catch (error) {
      handleError(error as AxiosError,true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-2 bg-gray-100 text-gray-800 rounded-lg w-auto p-3">
      {/* Close Button (Top Right Corner) */}
      <div className="absolute top-[-14px] right-[-14px]">
        <IconButton
          size="small"
          className="text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300">
            <Close fontSize="small" />
          </span>
        </IconButton>
      </div>

      {/* Label */}
      <div className="flex items-center gap-1 text-sm">
        <CalendarToday fontSize="small" />
        <span>{label}</span>
      </div>

      {/* Condition Select */}
      <Select
        value={condition}
        onChange={handleChange}
        displayEmpty
        className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
      >
        <MenuItem value="" disabled>Choose</MenuItem>
        <MenuItem value="is">Is</MenuItem>
        <MenuItem value="before">Is Not</MenuItem>
      </Select>

      {/* Date Filter Select */}
      <Select
        value={dateFilter}
        onOpen={handleColumnData}
        onChange={handleDateChange}
        displayEmpty
        className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
      >
        <MenuItem value="" disabled>Choose</MenuItem>
        {loading ? (
        <MenuItem disabled>
          <CircularProgress size={20} />
        </MenuItem>
      ) : (
        options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))
      )}
      </Select>
    </div>
  );
};

export default FilterComponent;






