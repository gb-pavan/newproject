// import React, { useState } from "react";
// import { Select, MenuItem, IconButton, SelectChangeEvent,CircularProgress } from "@mui/material";
// import { CalendarToday, Close } from "@mui/icons-material";
// import { Filter, QueryState } from "@/interfaces/tableFilterTypes";
// import { handleError } from "@/utils/helpers";
// import { AxiosError } from "axios";
// import { FilterInstance } from "@/services/tableFilter.service";

// interface FilterComponentProps {
//   label: string;
//   setFiltering:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
//   onClose: () => void;
// }

// const FilterComponent: React.FC<FilterComponentProps> = ({ label,setFiltering, onClose }) => {
  
//   const [condition, setCondition] = useState<string>("");
//   const [dateFilter, setDateFilter] = useState<string>("");
//   const [options, setOptions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (event: SelectChangeEvent<string>) => {
//     setCondition(event.target.value);
//     if (dateFilter === '') return;
//     setFiltering((prev) => ({
//       ...prev,
//       filters: [
//         ...prev.filters,
//         { field: label, operator: condition, value: [condition] }
//       ]
//     }));
//   };

//   const handleDateChange = (event: SelectChangeEvent<string>) => {
//     setDateFilter(event.target.value);
//     if (dateFilter === '') return;
//     setFiltering((prev) => ({
//       ...prev,
//       filters: [
//         ...prev.filters,
//         {
//           field: label,
//           operator: condition,
//           value: [dateFilter],
//         } as Filter, // Ensure the new object matches the Filter type
//       ],
//     }));
//   };

//   const handleColumnData = async () => {
//     setLoading(true);
//     try {
//       const response = await FilterInstance.getColumnData();
//       // const data = await response.json();
//       setOptions(response);
//     } catch (error) {
//       handleError(error as AxiosError,true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative inline-flex items-center gap-2 bg-gray-100 text-gray-800 rounded-lg w-auto p-3">
//       {/* Close Button (Top Right Corner) */}
//       <div className="absolute top-[-14px] right-[-14px]">
//         <IconButton
//           size="small"
//           className="text-gray-600 hover:text-gray-800"
//           onClick={onClose}
//         >
//           <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300">
//             <Close fontSize="small" />
//           </span>
//         </IconButton>
//       </div>

//       {/* Label */}
//       <div className="flex items-center gap-1 text-sm">
//         <CalendarToday fontSize="small" />
//         <span>{label}</span>
//       </div>

//       {/* Condition Select */}
//       <Select
//         value={condition}
//         onChange={handleChange}
//         displayEmpty
//         className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
//       >
//         <MenuItem value="" disabled>Choose</MenuItem>
//         <MenuItem value="is">Is</MenuItem>
//         <MenuItem value="before">Is Not</MenuItem>
//       </Select>

//       {/* Date Filter Select */}
//       <Select
//         value={dateFilter}
//         onOpen={handleColumnData}
//         onChange={handleDateChange}
//         displayEmpty
//         className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
//       >
//         <MenuItem value="" disabled>Choose</MenuItem>
//         {loading ? (
//         <MenuItem disabled>
//           <CircularProgress size={20} />
//         </MenuItem>
//       ) : (
//         options.map((option, index) => (
//           <MenuItem key={index} value={option}>
//             {option}
//           </MenuItem>
//         ))
//       )}
//       </Select>
//     </div>
//   );
// };

// export default FilterComponent;

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Select,
//   MenuItem,
//   IconButton,
//   SelectChangeEvent,
//   CircularProgress,
//   TextField,
// } from "@mui/material";
// import { CalendarToday, Close } from "@mui/icons-material";
// import { Filter, QueryState } from "@/interfaces/tableFilterTypes";
// import { handleError } from "@/utils/helpers";
// import { AxiosError } from "axios";
// import { FilterInstance } from "@/services/tableFilter.service";
// import TagInput from "./InputTags";
// import MultiSelectForm from "./FilterConditionDropdown";
// import { RootInstance } from "@/services/root.service";
// import { CreatedLeadField } from "@/interfaces/root.interface";

// interface FilterComponentProps {
//   label: string;
//   setFiltering: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
//   onClose: () => void;
// }

// const FilterComponent: React.FC<FilterComponentProps> = ({
//   label,
//   setFiltering,
//   onClose,
// }) => {
//   const [condition, setCondition] = useState<string>("");
//   const [dateFilter, setDateFilter] = useState<string>("");
//   const [options, setOptions] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [textedInput,setTexted] = useState<string[]>([]);
//   const [dropdownOpt,setDropdownOptions] = useState<string[]>([]);
//   const [createdFields,setCreatedFields] = useState<CreatedLeadField[]>([]);

//   // Labels that should render a text input instead of dropdown
//   const textInputLabels = ["name", "email", "city"]; // Update as needed

//   const isTextInput = textInputLabels.includes(label);

//   useEffect(() => {
//     console.log("11111");
//     const fetchCreatedLeadFields = async () => {
//       try {
//         const response = await RootInstance.getCreatedLeadFields(true);
//         console.log("response",response);
//         setCreatedFields(response);
//       } catch (error) {
//         handleError(error as AxiosError, false);
//       }
//     };

//     fetchCreatedLeadFields();
//   }, []);

//   const getDropdownOptions = (label: string) => {
//     const normalizedLabel = label.toLowerCase().replace(/\s+/g, "");
//     return createdFields.filter(option =>
//       option.name.toLowerCase().replace(/\s+/g, "") === normalizedLabel
//     );
//   };


//   useEffect(() => {
//         console.log("22222");
//     const optionResponse = getDropdownOptions(label);
//     setDropdownOptions(optionResponse[0].options);
//   }, [label,createdFields]);


//   const handleChange = (event: SelectChangeEvent<string>) => {
//     const selectedCondition = event.target.value;
//     setCondition(selectedCondition);
//   };

//   const handleDateChange = (event: SelectChangeEvent<string>) => {
//     const selectedValue = event.target.value;
//     setDateFilter(selectedValue);

//     setFiltering((prev) => ({
//       ...prev,
//       filters: [
//         ...prev.filters,
//         {
//           field: label,
//           operator: condition,
//           value: [selectedValue],
//         } as Filter,
//       ],
//     }));
//   };

//   const handleTextInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setDateFilter(event.target.value);
//   };

//   const handleTextInputBlur = () => {
//     if (dateFilter.trim() === "") return;
//     setFiltering((prev) => ({
//       ...prev,
//       filters: [
//         ...prev.filters,
//         {
//           field: label,
//           operator: condition,
//           value: [dateFilter],
//         } as Filter,
//       ],
//     }));
//   };

//   const handleColumnData = async () => {
//     setLoading(true);
//     try {
//       const response = await FilterInstance.getColumnData();
//       setOptions(response);
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     } finally {
//       setLoading(false);
//     }
//   };

//     console.log("getOptions",dropdownOpt);
//     console.log("createdFields",createdFields);


//   return (
//     <div className="relative inline-flex items-center gap-2 bg-gray-100 text-gray-800 rounded-lg w-auto p-3">
//       {/* Close Button */}
//       <div className="absolute top-[-14px] right-[-14px]">
//         <IconButton
//           size="small"
//           className="text-gray-600 hover:text-gray-800"
//           onClick={onClose}
//         >
//           <span className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full hover:bg-gray-300">
//             <Close fontSize="small" />
//           </span>
//         </IconButton>
//       </div>

//       {/* Label */}
//       <div className="flex items-center gap-1 text-sm">
//         <CalendarToday fontSize="small" />
//         <span>{label}</span>
//       </div>

//       {/* Condition Select */}
//       <Select
//         value={condition}
//         onChange={handleChange}
//         displayEmpty
//         className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
//       >
//         <MenuItem value="" disabled>
//           Choose
//         </MenuItem>
//         <MenuItem value="is">Is</MenuItem>
//         <MenuItem value="before">Before</MenuItem>
//         <MenuItem value="after">After</MenuItem>
//         <MenuItem value="contains">Contains</MenuItem>
//       </Select>

//       {/* Value Input Field (Dropdown or TextField) */}
//       {isTextInput ? (
//         <TagInput setTexted={setTexted} />
//       ) : (
//         // <Select
//         //   value={dateFilter}
//         //   onOpen={handleColumnData}
//         //   onChange={handleDateChange}
//         //   displayEmpty
//         //   className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
//         // >
//         //   <MenuItem value="" disabled>
//         //     Choose
//         //   </MenuItem>
//         //   {loading ? (
//         //     <MenuItem disabled>
//         //       <CircularProgress size={20} />
//         //     </MenuItem>
//         //   ) : (
//         //     options.map((option, index) => (
//         //       <MenuItem key={index} value={option}>
//         //         {option}
//         //       </MenuItem>
//         //     ))
//         //   )}
//         // </Select>
//         <MultiSelectForm label={label} setDropdownOptions={setDropdownOptions}/>
//       )}
//     </div>
//   );
// };

// export default FilterComponent;


import React, { useEffect, useState, useMemo } from "react";
import {
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { CalendarToday, Close } from "@mui/icons-material";
import { Filter, IAssignee, QueryState } from "@/interfaces/tableFilterTypes";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { RootInstance } from "@/services/root.service";
import { CreatedLeadField } from "@/interfaces/root.interface";
import TagInput from "./InputTags";
import MultiSelectForm from "./FilterConditionDropdown";
import { DropdownInstance } from "@/services/dropdown.service";
import GroupedMultiSelect from "./AssigneeFilterDropdown";

interface FilterComponentProps {
  label: string;
  setFiltering: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
  onClose: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  label,
  setFiltering,
  onClose,
}) => {
  const [condition, setCondition] = useState<string>("");
  const [createdFields, setCreatedFields] = useState<CreatedLeadField[]>([]);
  const [textedInput, setTextedInput] = useState<string[]>([]);
  const [dropdownSelected, setDropdownSelected] = useState<string[]>([]);
  const [grouped, setGrouped] = useState<{ label: string; options: IAssignee[] }[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);


  // Fetch all created fields
  useEffect(() => {
    const fetchCreatedLeadFields = async () => {
      try {
        const response = await RootInstance.getCreatedLeadFields(true);
        setCreatedFields(response);
      } catch (error) {
        handleError(error as AxiosError, false);
      }
    };

    fetchCreatedLeadFields();
  }, []);

  const groupUsers = (assignee:IAssignee[]) => [
    { label: 'Active', options: assignee.filter((u) => !u.isDeleted) },
    { label: 'Deleted', options: assignee.filter((u) => u.isDeleted) },
  ];


  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const response = await DropdownInstance.getAssignee(); // Await the API response
        setGrouped(groupUsers(response?.users));
      } catch (error) {
        handleError(error as AxiosError,false);
      }
    };
    fetchAssignees();
  }, []);

  

  console.log("dropd selectedfiltered",dropdownSelected);

  // Memoized fieldData based on label and createdFields
  const fieldData = useMemo(() => {
    if (createdFields.length === 0) return null;

    const normalizedLabel = label.toLowerCase().replace(/\s+/g, "");
    console.log("normalabel",normalizedLabel);
    // const found = createdFields.find(
    //   (field) =>
    //     field.name.toLowerCase().replace(/\s+/g, "") === normalizedLabel
    // );
    const found = createdFields.find((field) => {
      console.log("Checking field:", field); // 👈 this logs each field being checked
      console.log("Checking field maodified:", field.name.toLowerCase().replace(/\s+/g, "")); // 👈 this logs each field being checked
      return field.name.toLowerCase().replace(/\s+/g, "") === normalizedLabel;
    });

    

    console.log("Normalized label:", normalizedLabel);
    console.log("Available fields:", createdFields.map((f) => f.name));
    console.log("Matched field:", found);

    return found || null;
  }, [label, createdFields]);

  // Trigger filtering when text input changes
  // useEffect(() => {
  //   if (
  //     textedInput.length > 0 &&
  //     condition &&
  //     fieldData?.type.toLowerCase() === "text"
  //   ) {
  //     setFiltering((prev) => ({
  //       ...prev,
  //       filters: [
  //         ...prev.filters,
  //         {
  //           field: label,
  //           operator: condition,
  //           value: textedInput,
  //         } as Filter,
  //       ],
  //     }));
  //   }
  // }, [textedInput]);

  // useEffect(()=>{
  //   console.log("query triggered");
  //   if ((textedInput || dropdownSelected || selectedIds) && condition) {
  //     // ✅ Both have values, safe to run logic
  //     console.log("Running query with:", textedInput, dropdownSelected,condition, selectedIds);
  //     // Do your logic here...
  //   } else {
  //     // ⚠️ One of them is missing
  //     console.log("Waiting for both fields to be filled...");
  //   }
  // },[textedInput,dropdownSelected,condition,selectedIds])

//   useEffect(() => {
//   console.log("query triggered");
//   if (!condition) return; // Early return if operator is missing

//   if (selectedIds){
//     console.log("ids chagned",selectedIds);
//   }

//   // let filter:{field:string,operator:string,value:string[]} = null;
//   let filter: { field: string; operator: string; value: string[] } | null = null;


//   if (textedInput && label) {
//     filter = {
//       field: label,
//       operator: condition,
//       value: textedInput,
//     };
//   } else if (dropdownSelected && label) {
//     filter = {
//       field: label,
//       operator: condition,
//       value: dropdownSelected,
//     };
//   } else if (selectedIds.length && label) {
//     filter = {
//       field: label,
//       operator: condition,
//       value: selectedIds,
//     };
//   }

//   if (filter) {
//     console.log("Setting query with filter:", filter);

//     // setFiltering((prev) => ({
//     //   ...prev,
//     //   filters: [...prev.filters.filter(f => f.field !== label), filter],
//     // }));
//     setFiltering((prev) => ({
//       ...prev,
//       filters: [
//         ...prev.filters.filter((f) => f.field !== label),
//         ...(filter ? [filter] : []), // 👈 Only add if filter is not null
//       ],
//     }));

//   } else {
//     console.log("Waiting for all inputs to be filled...");
//   }
// }, [textedInput, dropdownSelected, selectedIds, condition, fieldData]);
useEffect(() => {
  console.log("query triggered");

  if (!condition) return; // Operator must be present

  const hasTextInput = textedInput && textedInput.length > 0;
  const hasDropdown = dropdownSelected && dropdownSelected.length > 0;
  const hasSelectedIds = selectedIds && selectedIds.length > 0;

  if (!(hasTextInput || hasDropdown || hasSelectedIds)) {
    console.log("Waiting for at least one value to be filled...");
    setFiltering((prev) => ({
      ...prev,
      filters: prev.filters.filter((f) => f.field !== label),
    }));
    return;
  }

  let filter: { field: string; operator: string; value: string[] } | null = null;

  if (hasTextInput && label) {
    filter = {
      field: label,
      operator: condition,
      value: textedInput,
    };
  } else if (hasDropdown && label) {
    filter = {
      field: label,
      operator: condition,
      value: dropdownSelected,
    };
  } else if (hasSelectedIds && label) {
    filter = {
      field: label,
      operator: condition,
      value: selectedIds,
    };
  }

  if (filter) {
    console.log("Setting query with filter:", filter);
 
    setFiltering((prev) => ({
      ...prev,
      filters: [
        ...prev.filters.filter((f) => f.field !== label),
        ...(filter ? [filter] : []), // 👈 Only add if filter is not null
      ],
    }));
  }
}, [textedInput, dropdownSelected, selectedIds, condition, fieldData]);



  // Trigger filtering when dropdown selection changes
  useEffect(() => {
    if (
      dropdownSelected.length > 0 &&
      condition &&
      fieldData?.type.toLowerCase() === "dropdown"
    ) {
      setFiltering((prev) => ({
        ...prev,
        filters: [
          ...prev.filters,
          {
            field: label,
            operator: condition,
            value: dropdownSelected,
          } as Filter,
        ],
      }));
    }
  }, [dropdownSelected]);

  const handleConditionChange = (event: SelectChangeEvent<string>) => {
    console.log("checkig is or not",event.target.value);
    setCondition(event.target.value);
  };

  console.log("fieldData",fieldData);
  console.log("createdFields",createdFields);


  const getOptionsByLabel = (label:string) => {
    switch (label) {
      case 'Date':
        return [
          { value: 'equal_to', label: 'Equal to' },
          { value: 'before', label: 'Before' },
          { value: 'after', label: 'After' },
          { value: 'is_empty', label: 'Is empty' },
          { value: 'is_not_empty', label: 'Is not empty' },
        ];
      case 'phone':
        return [
          { value: 'IS', label: 'IS' },
          { value: 'IS_NOT', label: 'IS_NOT' },
        ]
      case 'name':
        return [
          { value: 'is', label: 'IS' },
          { value: 'is_not', label: 'IS_NOT' },         
          { value: 'equal_to', label: 'CONTAINS' },
          { value: 'not_equal_to', label: 'CONTAINS_NOT' },
          { value: 'begins_with', label: 'BEGINS_WITH' },
          { value: 'not_begin_with', label: 'NOT_BEGINS_WITH' },
          { value: 'is_empty', label: 'IS_EMPTY' },
          { value: 'is_not_empty', label: 'IS_NOT_EMPTY' }         
        ];
      case 'class':
        return [
          { value: 'equal_to', label: 'Equal to' },
          { value: 'not_equal_to', label: 'Not equal to' },
        ];
      case 'assignedOwner':
        return [
          { value: 'IS', label: 'IS' },
          { value: 'IS_NOT', label: 'IS_NOT' },
        ];
      default:
        return [
          { value: 'equal_to', label: 'Equal to' },
          { value: 'not_equal_to', label: 'Not equal to' },
          { value: 'is_empty', label: 'Is empty' },
          { value: 'is_not_empty', label: 'Is not empty' },
        ];
    }
  };

  console.log("field and groupted",fieldData,grouped);
  console.log("selectedIds",selectedIds);

  const options = getOptionsByLabel(label);

  return (
    <div className="relative inline-flex items-center gap-2 bg-gray-100 text-gray-800 rounded-lg w-auto p-3">
      {/* Close Button */}
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

      {/* Condition Selector */}
      {/* <Select
        value={condition}
        onChange={handleConditionChange}
        displayEmpty
        className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
      >
        <MenuItem value="" disabled>
          Choose
        </MenuItem>
        <MenuItem value="is">Is</MenuItem>
        <MenuItem value="before">Before</MenuItem>
        <MenuItem value="after">After</MenuItem>
        <MenuItem value="contains">Contains</MenuItem>
      </Select> */}
      {/* <Select
        value={condition}
        onChange={handleConditionChange}
        displayEmpty
        className="text-xs h-8 bg-white border border-gray-300 rounded w-auto"
      >
        <MenuItem value="" disabled>
          Choose
        </MenuItem>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select> */}
      <FormControl className="text-xs h-8 bg-white border border-gray-300 rounded w-auto" size="small">
  <Select
    value={condition}
    onChange={handleConditionChange}
    displayEmpty
  >
    <MenuItem value="" disabled>
      Choose
    </MenuItem>
    {options.map((opt) => (
      <MenuItem key={opt.value} value={opt.label}>
        {opt.label}
      </MenuItem>
    ))}
  </Select>
</FormControl>


      {/* Dynamic Input Field */}
      {(fieldData?.type.toLowerCase() === "text" || label === 'name' || label === 'phone') ? (
        <TagInput setTexted={setTextedInput} />
      ) : fieldData?.type.toLowerCase() === "dropdown" ? (
        <MultiSelectForm
          label={label}
          options={fieldData.options}
          onChange={setDropdownSelected}
        />
      ) : null}
      {label.toLocaleLowerCase() === "assignedowner" && grouped.length > 0 && 
      <GroupedMultiSelect
        groups={grouped}
        selectedIds={selectedIds}
        onChange={setSelectedIds}
      />
      }
    
    </div>
  );
};

export default FilterComponent;









