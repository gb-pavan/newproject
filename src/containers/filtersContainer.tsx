'use client';
import SearchBox from "@/components/SearchBox";
import { Filter, FilterState, IAssignee, IStatus, QueryState } from "@/interfaces/tableFilterTypes";
import DateFilter from "@/components/DateFilter";
import { TIME_RANGE } from "@/utils/constants/timeRanges";
import CustomDropdown2 from "@/components/MyDropdown2";
import { mapAssigneeToDropdownOptions, mapStatusToDropdownOptions } from "@/utils/helpers";

interface TableFiltersProps {
  filterState:FilterState
  setFilter: (newState: (prev: FilterState) => FilterState) => void;
  query: QueryState
  setQuery:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
  assignee: IAssignee[];
  statusInfo :IStatus[];
  rowsCount : number;
}

// interface DropdownOption {
//   label: string;
//   value: string | number;
//   icon?: string; // Icon name as string
//   color?: string;
//   addDeco?:boolean;
//   showCheckbox?: boolean;
// }


const TableFilters:React.FC<TableFiltersProps> = ({query, rowsCount,setQuery,assignee,statusInfo}) => { 

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

  const handleAssigneeChange = (newValues: string[]) => {
    console.log("assigneeeeee check",newValues);
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

  console.log("assgneTODrop",mapAssigneeToDropdownOptions(assignee,{ showCheckbox: false,addDeco:true }));
    console.log("assgneTODrop2222",assignee);


  return (
    <div className="flex items-center justify-between dark:invert mb-2">
      <h2 className="font-semibold text-[20px] font-[300]">
        Leads <span className="text-gray-500">({(Number(rowsCount ?? 0))})</span>
      </h2>
      <div className="flex items-center">
        <div className="flex space-x-4">
          <SearchBox placeholder="Type and Press Enter" setFilter={setQuery} iconSize={24} responsive
              iconColor="#0D2167"
          />
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
      </div>
      
      </div>
    </div>
  );
};

export default TableFilters;
