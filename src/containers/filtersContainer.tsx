'use client';
// import SearchBox from "@/components/SearchBox";
import { Filter, FilterState, IAssignee, IStatus, QueryState } from "@/interfaces/tableFilterTypes";
import DateFilter from "@/components/DateFilter";
import { TIME_RANGE } from "@/utils/constants/timeRanges";
import CustomDropdown2 from "@/components/MyDropdown2";
import { mapAssigneeToDropdownOptions, mapStatusToDropdownOptions } from "@/utils/helpers";
import { useState } from "react";
import SlidingPanel from "@/components/SlidePanel";
import BulkActions from "./BulkEditContainer";

interface TableFiltersProps {
  filterState:FilterState
  setFilter: (newState: (prev: FilterState) => FilterState) => void;
  query: QueryState
  setQuery:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
  assignee: IAssignee[];
  statusInfo :IStatus[];
  rowsCount : number;
  selectedIds: string[];
}

// interface DropdownOption {
//   label: string;
//   value: string | number;
//   icon?: string; // Icon name as string
//   color?: string;
//   addDeco?:boolean;
//   showCheckbox?: boolean;
// }

const TableFilters:React.FC<TableFiltersProps> = ({query, setQuery,assignee,statusInfo,selectedIds}) => { 

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleStatusChange = (newValues: string[]) => {
    setQuery((prev) => ({
      ...prev,
      filters: [
        // Remove existing "status" filter
        ...prev.filters.filter((filter) => filter.field !== "status"),

        // Add new "status" filter if values exist
        ...(newValues.length > 0
          ? [
              {
                field: "status",
                operator: "IN",
                value: newValues, // Ensure it's an array
              } as Filter,
            ]
          : []),
      ],
    }));
  };

  function extractIds(data:IAssignee[]) {
    return data
      .map(item => item._id)
      .filter(id => id !== undefined && id !== null); // remove undefined/null if any
  }


  const handleAssigneeChange = (newValues: string[]) => {
    console.log("assigneeeeee check",newValues);
    
    if (newValues.every(val => val.trim() === '')) {
      const allAssignee:IAssignee[] = assignee;
      console.log("chekc",allAssignee);
      const ids = extractIds(allAssignee); // assuming your array is stored in a variable
      console.log(ids); // ['67c6d2e3ca39a9c9c3c3f824', '67cb17f097eb04cf8489c914', ...]
    //   setQuery((prev) => ({
    //   ...prev,
    //   filters: [
    //     ...prev.filters.filter((filter) => filter.field !== "assignedOwner"),
    //     // {
    //     //   field: "Assignee",
    //     //   operator: "IN",
    //     //   value: [...newValues],
    //     // } as Filter,
    //     ...(newValues.length > 0
    //       ? [
    //           {
    //             field: "assignedOwner",
    //             operator: "IN",
    //             value: [...ids], // Ensure it's an array
    //           } as Filter,
    //         ]
    //       : []),
    //   ],
    // }));
    setQuery((prev) => {
  const queryWithoutSearch = { ...prev };
  delete queryWithoutSearch.search;

  return {
    ...queryWithoutSearch,
    filters: [
      ...prev.filters.filter((filter) => filter.field !== "assignedOwner"),
      ...(newValues.length > 0
        ? [
            {
              field: "assignedOwner",
              operator: "IN",
              value: [...ids],
            } as Filter,
          ]
        : []),
    ],
  };
});
 
      return
    }
    setQuery((prev) => ({
      ...prev,
      filters: [
        ...prev.filters.filter((filter) => filter.field !== "assignedOwner"),
        // {
        //   field: "Assignee",
        //   operator: "IN",
        //   value: [...newValues],
        // } as Filter,
        ...(newValues.length > 0
          ? [
              {
                field: "assignedOwner",
                operator: "IN",
                value: [...newValues], // Ensure it's an array
              } as Filter,
            ]
          : []),
      ],
    }));   
  };


  return (
    <div className="flex items-center justify-between dark:invert mb-2">
      <h2 className="font-semibold text-[20px] font-[300]">
        {/* Leads <span className="text-gray-500">({(  selectedIds ?? 0))})</span> */}
        Leads <span className="text-gray-500">({selectedIds?.length ?? 0})</span>
      </h2>
      <div className="flex items-center">
        <div className="flex space-x-4">
          {/* <SearchBox placeholder="Type and Press Enter" setFilter={setQuery} iconSize={24} responsive
              iconColor="#0D2167"
          /> */}

          <CustomDropdown2 options={mapAssigneeToDropdownOptions(assignee,{ showCheckbox: false,addDeco:true })} defaultValue="Assignee" onChange={handleAssigneeChange} />
          <DateFilter options={[...TIME_RANGE]} setDate={setQuery} />
        
        {/* <MultiSelectDropdown options={statusInfo} selectedOptions={filterState.status} onSelect={(values: string[]) => {
          console.log("filter state",values)
          setQuery(prev => ({
            ...prev,
            status: values,
          }));
        }} /> */}
        <CustomDropdown2
          options={mapStatusToDropdownOptions(statusInfo, { showCheckbox: true,addDeco:false })}
          selectedValues={query.filters.find(each => each.field === "status")?.value || []}
          onChange={handleStatusChange}
          multiSelect={true}
          defaultValue="Status"
        />
        <button
            onClick={() => setIsPanelOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Bulk Edit
        </button>
      </div>
      
      </div>

      
      <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        {/* You can place anything inside here */}
        <BulkActions />
      </SlidingPanel>

    </div>
  );
};

export default TableFilters;
