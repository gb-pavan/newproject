'use client';
import DynamicTable3 from "@/components/DragDropTable";
import FilterComponent from "@/components/FilterCondition";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import TableFilters from "@/containers/filtersContainer";
import { ITableFields } from "@/interfaces";
import { FilterState,QueryState, IAssignee, IStatus } from "@/interfaces/tableFilterTypes";
import { getAllKeys, handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FilterInstance } from "@/services/tableFilter.service";
import { DropdownInstance } from "@/services/dropdown.service";
import { columns } from "@/utils/constants";

const TableContainer: React.FC = () => {

  const [tableData,setTableData] = useState<ITableFields[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    status: [],
    searchString: '',
    singleDate: undefined,
    dateRange: { startDate: undefined, endDate: undefined },
  });
    
  const [currentPage, setCurrentPage] = useState(1);
  // const selectedRowIdsRef = useRef<Set<number>>(new Set());
  const selectedRowIdsRef = useRef<Set<string>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [addCondition,setCondition] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [query, setQuery] = useState<QueryState>({
    filters:[],
    logic: "AND",
    pagination: {
      page: currentPage,
      limit: rowsPerPage
    }
  });
  const [assignee, setGetAssignee] = useState<IAssignee[]>([]);
  const [statusInfo, setGetStatus] = useState<IStatus[]>([]);
  const totalPages = (totalRows/rowsPerPage);
  const listRef = useRef<HTMLDivElement>(null); // Ref for the dropdown list container

  // const handleRowClick = (id: number) => {
  //   if (selectedRowIdsRef.current.has(id.toLocaleString())) {
  //     // selectedRowIdsRef.current.delete(id);
  //     selectedRowIdsRef.current.add(String(id));
  //   } else {
  //     // selectedRowIdsRef.current.add(id);
  //     selectedRowIdsRef.current.add(String(id));
  //   }

  //   // For debugging
  //   console.log('Selected Row IDs:', Array.from(selectedRowIdsRef.current));
  // };

  const handleRowClick = (id: string) => {
    if (selectedRowIdsRef.current.has(id)) {
      selectedRowIdsRef.current.delete(id);
    } else {
      selectedRowIdsRef.current.add(id);
    }
    setSelectedIds(Array.from(selectedRowIdsRef.current)); // causes re-render, but ref is safe

    console.log('Selected Row IDs:', Array.from(selectedRowIdsRef.current));
  };

  console.log("on renbder selected id",Array.from(selectedRowIdsRef.current));


  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setCondition(false); // Close the dropdown if the click is outside
    }
  };

  useEffect(() => {
    if (addCondition) {
      // Add event listener when the list is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove the event listener when the list is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
    };
  }, [addCondition]);

  useEffect(() => {
     const fetchAssignees = async () => {
    try {
      const response = await DropdownInstance.getAssignee(); // Await the API response
      console.log("response assignee",response);
      setGetAssignee(response?.users);
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  };

  const fetchStatusInfo = async () => {
    try {
      const response = await DropdownInstance.getStatus();
      setGetStatus(response);
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  }
    fetchAssignees();
    fetchStatusInfo();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    console.log("pages",rowsPerPage);
     const filterData = async () => {
    try {
      const filterResponse = await FilterInstance.getFilterResponse(query); // Await the response
      console.log("filter resssssppppp check",filterResponse);
      setTableData(filterResponse?.leads);
      setTotalRows(filterResponse?.total);
    } catch (error) {
      handleError(error as AxiosError,false);
    }
  };
    filterData();
  }, [query, currentPage, rowsPerPage]); // Runs when these dependencies change


  const handleCondition = (key:string) => {
    setFilters([...filters,key]);
    setCondition(prev=>!prev);
  }

  const handleCloseFilter = (columnLabel:string) => {
    setFilters(filters.filter((each) => each !== columnLabel));
    setQuery((prevQuery) => ({
    ...prevQuery,
    filters: prevQuery.filters.filter((filter) => filter.field !== columnLabel),
  }));
  };

  return (
    <div>
      <div className="p-6 rounded-[22px] border border-black w-full dark-invert">
        <div className="flex justify-between w-full">
          <span className="text-[17px] font-[700] text-[#0D2167]">All Leads</span>
          <button className="bg-[#0D2167] text-white px-4 py-2 rounded-md" onClick={()=>setCondition(prev=>!prev)}>+ Add a Condition</button>
        </div>

        <div className="flex justify-between items-center gap-10 p-2">
          <SearchBox iconSize={32} placeholder='Search' iconColor="#0D2167" responsive={false} setFilter={setQuery}/>
          <div className="flex items-center gap-3">
            <MdKeyboardArrowLeft size={24} color="#0D2167" />
              {1}
            <MdOutlineKeyboardArrowRight size={24} color="#0D2167" />
          </div>
          <IoSettingsOutline size={24} color="#0D2167" />
        </div>
        {addCondition && <div ref={listRef}>
          <ul className="m-3 mt-0 p-3 pt-0 border border-[#C6CCE0] rounded-md">
            {getAllKeys(tableData).map((key) => (
              <li
                key={key}
                onClick={() => handleCondition(key)}
                style={{ cursor: "pointer", padding: "5px" }}
                className="dark:invert"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>
        }

        {filters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <FilterComponent
                key={filter}
                label={filter}
                setFiltering={setQuery}
                onClose={() => handleCloseFilter(filter)}
              />
            ))}
          </div>
        )}
      </div>
        <div className="flex flex-wrap gap-6 m-5 ml-0 mb-0 dark:invert">
          <button className="relative w-[119px] h-[44px] rounded-full bg-white text-black font-medium">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[#FF2CF7] via-[#FB047BCB] via-[#FF7EBCCF] via-[#FFFFFF00] via-[#49FFE9A6] to-[#130EFF]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              Today Leads
            </div>
          </div>
        </button>
          <button className="w-[130px] h-[44px] rounded-full border-2 border-black bg-white text-black font-medium flex items-center justify-center shadow-md">
          <span className="text-sm">Yesterday Leads</span>
        </button>
        </div>
        <TableFilters rowsCount={tableData?.length} setFilter={setFilterState} selectedIds={selectedIds} query={query} setQuery={setQuery} filterState={filterState} assignee={assignee} statusInfo={statusInfo} />
        <DndProvider backend={HTML5Backend}>
        <DynamicTable3 data={tableData} selectedRowIdsRef={selectedRowIdsRef} columns={columns} statusInfo={statusInfo} tableType="lead" onRowClick={handleRowClick} /></DndProvider>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          // onPageChange={(page) => setQuery(prevQuery => ({
          //   ...prevQuery,
          //   pagination: {
          //     ...prevQuery.pagination,
          //     page: page // Replace `newPage` with the actual page number
          //   }
          // })),
          // setCurrentPage(page),
          // }
          onPageChange={(page) => {
  setQuery(prevQuery => ({
    ...prevQuery,
    pagination: {
      ...prevQuery.pagination,
      page: page
    }
  }));
  setCurrentPage(page);
}}

          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
    </div>
  );
};

export default TableContainer;