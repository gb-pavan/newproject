import React, { useState, useRef, useEffect, useMemo } from "react";
import { Check, ChevronDown, LucideProps } from "lucide-react";
import DynamicIcon from "./DynamicIcon";
import SearchBox from "./SearchBox";
import FilterChips from "./FilterChips";

interface DropdownOption {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
  addDeco?: boolean;
  showCheckbox?: boolean;
  id?: string;
}

interface DropdownCategory {
  label: string;
  key: string;
  options: DropdownOption[];
}

interface CustomDropdownProps {
  options?: DropdownOption[];
  categories?: DropdownCategory[];
  selectedValues?: string[] | string;
  onChange: (values: string[]) => void;
  multiSelect?: boolean;
  btnIcon?: string;
  defaultValue?: string;
}

const Icons: Record<string, React.FC<LucideProps>> = {
  check: Check,
  chevronDown: ChevronDown,
};

const CustomDropdown2: React.FC<CustomDropdownProps> = ({
  options = [],
  categories,
  selectedValues,
  onChange,
  multiSelect = false,
  btnIcon,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [filteredOptions, setFilterOptions] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  console.log("selectedValues assignee",selectedValues);

  const handleSelectionChange = (selected: string[]) => {
    console.log("Selected Values:", selected);
  };

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const filteringOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          option.label?.toLowerCase().includes(filteredOptions.toLowerCase()) ||
          option.value?.toString().toLowerCase().includes(filteredOptions.toLowerCase())
      ),
    [options, filteredOptions]
  );

  const filteredCategories = useMemo(() => {
    if (!categories) return [];

    return categories
      .map((cat) => ({
        ...cat,
        options: cat.options.filter((opt) =>
          opt.label.toLowerCase().includes(filteredOptions.toLowerCase())
        ),
      }))
      .filter((cat) => cat.options.length > 0);
  }, [categories, filteredOptions]);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!multiSelect && selectedValues?.length === 0 && options.length > 0) {
      onChange([options[0].value.toString()]);
    }
  }, [multiSelect, selectedValues, options, onChange]);

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
    console.log("assigne option selected",value);
    let newValues = Array.isArray(selectedValues) ? [...selectedValues] : selectedValues ? [selectedValues] : [];

    if (multiSelect) {
      newValues = newValues.includes(value)
        ? newValues.filter((val) => val !== value)
        : [...newValues, value];
    } else {
      newValues = [value];
      setIsOpen(false);
    }

    onChange(newValues);
  };

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
        {defaultValue === "Assignee" && <DynamicIcon name={btnIcon ?? "GoPerson"} className="text-gray-600" size={24} />}
        <span>{defaultValue === "Assignee" && isSmallScreen ? "" : displayText}</span>
        <span>{defaultValue === "Active" ? selectedValues : ""}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div
          className="absolute z-10 right-0 mt-2 border rounded-md shadow-lg bg-white"
          style={{
            width: defaultValue === "Status" ? "10.5rem" : defaultValue === "Assignee" ? "16rem" : undefined,
          }}
        >
          {/* Header */}
          <div className="m-4 space-y-2">
            {(defaultValue === "Assignee" || defaultValue === "Status" || defaultValue === "AssignTo") && (
              <div className="flex items-center gap-2">
                {defaultValue === "AssignTo" && <input type="checkbox" className="w-4 h-4" />}
                <SearchBox
                  iconSize={32}
                  placeholder="Search"
                  iconColor="#0D2167"
                  responsive={false}
                  setFilterOptions={setFilterOptions}
                />
              </div>
            )}
            {defaultValue === "AssignTo" && <FilterChips onSelectionChange={handleSelectionChange} />}
          </div>

          {/* Options */}
          <div className="max-h-64 overflow-y-auto p-2">
            <ul>
              {categories ? (
                filteredCategories.map((cat) => {
                  const isExpanded = expandedCategories[cat.key] ?? true;

                  return (
                    <div key={cat.key} className="mb-2">
                      <div
                        className="flex justify-between items-center font-medium text-sm text-gray-600 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                        onClick={() => toggleCategory(cat.key)}
                      >
                        <span>{cat.label}</span>
                        <ChevronDown
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                          size={16}
                        />
                      </div>

                      {isExpanded &&
                        cat.options.map((option) => {
                          console.log("is selected values",selectedValues);
                          console.log("option values",option?.id);
                          const isSelected = selectedValues?.includes(option?.id!);
                          console.log("is selected",isSelected);
                          const IconComponent = option.icon ? Icons[option.icon] : null;

                          return (
                            <li
                              key={option.value.toString()}
                              onClick={() => handleSelect(option.id?.toString() ?? option.value.toString())}
                              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                            >
                              {option.showCheckbox && (
                                <input type="checkbox" checked={isSelected} readOnly className="w-4 h-4" />
                              )}
                              {IconComponent && <IconComponent size={16} />}
                              {option.color && (
                                <span className="w-4 h-4 rounded" style={{ backgroundColor: option.color }}></span>
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
                    </div>
                  );
                })
              ) : (
                filteringOptions.map((option) => {
                  const isSelected = selectedValues?.includes(option?.value?.toString()!);
                  const IconComponent = option.icon ? Icons[option.icon] : null;

                  return (
                    <li
                      key={option?.value?.toString()}
                      onClick={() => handleSelect(option.id?.toString() ?? option.value.toString())}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option.showCheckbox && (
                        <input type="checkbox" checked={isSelected} readOnly className="w-4 h-4" />
                      )}
                      {IconComponent && <IconComponent size={16} />}
                      {option.color && (
                        <span className="w-4 h-4 rounded" style={{ backgroundColor: option.color }}></span>
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
                })
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown2;








