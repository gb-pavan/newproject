'use client';
import { ITableFields } from "@/interfaces";
import React, { useState,useEffect, useRef } from "react";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { capitalizeFirstLetterOfEachWord, formatCamelCase, formatDate, getAssignedOwnerEmail, getAssignedOwnerName, getColumnValue, handleError } from "@/utils/helpers";
import { IStatus, QueryState } from "@/interfaces/tableFilterTypes";
import { AxiosError } from "axios";
import { TableInstance } from "@/services/table.service";
import { EXCLUDED_COLUMNS, EXCLUDED_COLUMNS_TEAM } from "@/utils/enum";

interface TableProps {
  data: ITableFields[];
  columns: string[];
  statusInfo?:IStatus[];
  tableType:string;
  // onRowClick: (id: number) => void;
  onRowClick?: (id: string) => void;
  selectedRowIdsRef?: React.RefObject<Set<string>>; // 👈 Add this
  tabColumns?:string[];
  setQuery?:(query: QueryState | ((prev: QueryState) => QueryState)) => void;
}

const ItemType = "COLUMN";

interface DragItem {
  index: number;
  id: string;
}

const DraggableItem: React.FC<{
  id: string;
  index: number;
  moveItem: (from: number, to: number) => void;
  checked: boolean;
  onCheck: () => void;
}> = ({ id, index, moveItem, checked, onCheck }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <li ref={ref} className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer border-b">
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <span className="flex-grow ml-2">{id}</span>
      <span className="cursor-grab text-gray-500">&#x2630;</span>
    </li>
  );
};

const columnStyles: Record<string, string> = {
  class: "bg-[#FEF2F2] text-[#B91C1C]", // Light red background with dark red text
  board:"bg-[#FBE8FF] text-[#8E198F]"
};

const COLUMN_STORAGE_KEY = "displayColumns";

const DynamicTable3: React.FC<TableProps> = ({ data,tabColumns,setQuery, columns,statusInfo,tableType,onRowClick,selectedRowIdsRef }) => {
  // const [displayColumns, setDisplayColumns] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkedRows, setCheckedRows] = useState<boolean[]>([]);
  const [headerChecked, setHeaderChecked] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [favoriteRows, setFavoriteRows] = useState<Record<string, boolean>>({});
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [displayColumns, setDisplayColumns] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedColumns = localStorage.getItem(COLUMN_STORAGE_KEY);
      return savedColumns ? JSON.parse(savedColumns) : columns;
    }
    return columns;
  });
  const excludedCols = tableType === 'lead' ? EXCLUDED_COLUMNS : EXCLUDED_COLUMNS_TEAM;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(COLUMN_STORAGE_KEY, JSON.stringify(displayColumns));
    }
  }, [displayColumns]);


  // useEffect(() => {
  //   setDisplayColumns(columns);
  // }, [columns]);

  useEffect(() => {
    const initialFavorites: Record<string, boolean> = {};

    data?.forEach((item) => {
      // initialFavorites[item._id as string] = item.name.favorite;
      if (typeof item.name === "object" && item.name !== null && "favorite" in item.name) {
        initialFavorites[item._id as string] = (item.name as { favorite: boolean }).favorite;
      }
    });

    setFavoriteRows(initialFavorites);
  }, [data]);

  useEffect(() => {
    if (setQuery) {
      setQuery((prev: QueryState) => ({
        ...prev,
        selectedFields: displayColumns
      }));
    }
  }, [displayColumns, setQuery]);




  useEffect(() => {
    if (data?.length) {
      const tableCols = Array.from(new Set(data.flatMap((row) => Object.keys(row))));
      setColumnOrder(tableCols);
      setCheckedRows(Array(data.length).fill(false));
    }
  }, [data]);

  const handleFavoriteToggle = async (rowId: string,favState:boolean) => {
    try{
      await TableInstance.toggleFavorite(rowId,favState);
      setFavoriteRows((prev) => ({
        ...prev,
        [rowId]: !prev[rowId],
      }));
    } catch(error){
      handleError(error as AxiosError,false);
    }
  };

  function extractGrade(value: string): string {
    const match = value.match(/^(\d{1,2}(?:st|nd|rd|th))/);
    return match ? match[1] : value;
  }



  const handleCheckboxChange = (key: string) => {
    setDisplayColumns((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const moveItem = (from: number, to: number) => {
    setColumnOrder((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    const allSelected = data?.every(row => selectedRowIdsRef?.current.has(String(row._id)));
    setHeaderChecked(allSelected);
  }, [data, selectedRowIdsRef]);


  // const handleHeaderCheckboxChange = () => {
  //   const newChecked = !headerChecked;
  //   setHeaderChecked(newChecked);
  //   setCheckedRows(Array(data.length).fill(newChecked));
  // };

  const handleHeaderCheckboxChange = () => {
    const newChecked = !headerChecked;
    data.forEach(row => {
      const rowId = String(row._id);
      if (!newChecked) {
        selectedRowIdsRef?.current.add(rowId);
        onRowClick?.(String(rowId));
      } else {
        selectedRowIdsRef?.current.delete(rowId);
        onRowClick?.(String(rowId));
      }
    });
    setHeaderChecked(newChecked);
  };


  function getStatusColor(id: number): string | undefined {
    const status = statusInfo?.find(s => s.statusid === id);
    return status ? status.color : undefined;
  }

  function getStatusLabel(id: number): string | undefined {
    const status = statusInfo?.find(s => s.statusid === id);
    return status ? status.label : undefined;
  }

  const handleRowCheckboxChange = (index: number,rowId:string) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);
    setHeaderChecked(updatedCheckedRows.every(Boolean));
    onRowClick?.(String(rowId)
);
  };

  // const handleNameClick = () => {
  //   setIsPanelOpen(true);
  // }

  const handleNameClick = (rowId: string) => {
    // Construct the URL for the lead details page
    const detailsUrl = `/dashboard/table/${rowId}`;
    
    // Open the details page in a new tab
    window.open(detailsUrl, '_blank');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative overflow-x-auto w-full dark:invert border-l border-r border-t border-gray-800 rounded-t-lg">
        <div ref={dropdownRef} className="absolute cursor-pointer z-30" style={{top:10, right:10}}>
              <button onClick={() => setDropdownOpen((prev) => !prev)} className="p-2 rounded-full hover:bg-gray-300">
                <PiDotsThreeOutlineVertical size={20} className="text-gray-600 hover:text-gray-900" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-800 rounded-lg shadow-lg z-40 p-2">
                  <ul className="text-sm text-gray-700 overflow-y-auto" style={{maxHeight:'200px'}}>
                    {/* {columnOrder?.map((key, index) => ( */}
                    {/* {tabColumns?.filter(key => !excludedCols.includes(key)).map((key, index) => (                    */}
                    {tabColumns?.map((key, index) => (
                      <DraggableItem
                        key={key}
                        id={key}
                        index={index}
                        moveItem={moveItem}
                        checked={displayColumns.includes(key)}
                        onCheck={() => handleCheckboxChange(key)}
                      />
                    ))}
                  </ul>
                </div>
              )}
        </div>

        <div className="overflow-auto" ref={tableRef} >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left text-sm font-semibold h-12">
                <th className="sticky left-0 p-3 border-r bg-gray-200 border-gray-800 w-12 text-center">            
                  <input
                    type="checkbox"
                    checked={headerChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                </th>
                {/* {columnOrder?.map((col, colIndex) => { */}
                {columnOrder?.filter(key => !excludedCols.includes(key)).map((col, colIndex) => {
                  if (!displayColumns.includes(col)) return null;
                  return (
                    <th key={colIndex} className={`${col.includes('name') ? 'sticky left-9 bg-gray-200': ''} ${col.includes('phone') ? 'sticky left-[185px] bg-gradient-to-r from-gray-200 to-transparent': ''} p-3 border-r text-[12px] font-[800] border-gray-800 min-w-[150px]`}>
                      {col.includes('Name') || col.includes('Phone') ? (
                        <div className="flex items-center">                        
                            <span className="text-[14px]">{formatCamelCase(col)}</span>
                        </div>
                      ) : (
                        <span className="text-[14px]">{formatCamelCase(col)}</span>
                      )}
                    </th>
                  );
                })}
                {/* {tableType === 'team' && (
                  <th className="p-3 border-r border-gray-800 text-[12px] font-[800] min-w-[120px]">
                    Actions
                  </th>
                )} */}
              </tr>
            </thead>
            <tbody>
              {data?.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-800 text-sm">
                  <td className="sticky left-0 p-3 border-r border-gray-800 bg-white w-12 text-center">
                    <input
                      type="checkbox"
                      // checked={checkedRows[rowIndex] || false}
                      checked={selectedRowIdsRef?.current.has(String(row._id))}
                      onChange={() => handleRowCheckboxChange(rowIndex,String(row._id))}
                    />
                  </td>
                  {columnOrder?.filter(key => !excludedCols.includes(key)).map((col, colIndex) => {
                    if (!displayColumns.includes(col)) return null;
                    return (
                      <td key={colIndex} className={`${col.includes('name') ? 'sticky left-9 bg-white': ''} ${col.includes('phone') ? 'sticky left-[185px] bg-gradient-to-r from-white via-white/90 to-transparent': ''} p-3 border-r border-gray-800`}>
                        {col.toLocaleLowerCase() === 'name' ? (
                          <div className="flex items-center text-[14px] font-[400] gap-2 inline-block whitespace-nowrap">                       
                            <div onClick={(e) => {
                                e.stopPropagation();
                                // handleFavoriteToggle(row._id, row.name.favorite);
                                // if (typeof row.name.favorite === "boolean" && typeof row._id === 'string') {
                                //   console.log("favvv checkk checkkkkk in if");
                                //   handleFavoriteToggle(row._id, row.name.favorite);
                                // }
                                if (
                                  typeof row.name === "object" && // Ensure row.name is an object
                                  row.name !== null &&            // Ensure it's not null
                                  "favorite" in row.name &&       // Ensure favorite exists in the object
                                  typeof row.name.favorite === "boolean" &&
                                  typeof row._id === "string"
                                ) {
                                  handleFavoriteToggle(row._id, row.name.favorite);
                                }
                              }}
                              style={{ cursor: "pointer" }}>
                              {/* {favoriteRows[row._id as string] ? <FaStar color="#fcba03" /> : <FaRegStar color="black" />} */}
                              {tableType !== 'team' && (
                                favoriteRows[row._id as string]
                                  ? <FaStar color="#fcba03" />
                                  : <FaRegStar color="black" />
                              )}
                            </div>
                            {/* <span className="text-[14px] ml-2" onClick={() => handleNameClick(row._id)} 
                              style={{ cursor: "pointer", color: "#0D2167", textDecoration: "underline" }}>{row[col]?.name || "-"}</span> */}
                              <div className="relative group">
                              <span
                                className="text-[14px] flex justify-center cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] inline-block"
                                onClick={() => handleNameClick(row._id as string)}
                                // style={{
                                //   cursor: "pointer",
                                //   // color: "#0D2167",
                                //   // textDecoration: "underline",
                                // }}
                              >
                                {/* {capitalizeFirstLetterOfEachWord(row[col]?.name) || "-"} */}
                                {capitalizeFirstLetterOfEachWord(getColumnValue(row, col)) || "-"}
                              </span>
                              {/* Tooltip for long names */}
                              {(() => {
                                const fullName = getColumnValue(row, col) || "-";
                                const nameParts = fullName.split(" ");

                                if (nameParts.length > 2) {
                                  return (
                                    <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white text-black p-2 rounded-md text-sm z-50 whitespace-nowrap shadow-lg">
                                      <div className="flex items-center text-[14px] cursor-pointer whitespace-nowrap gap-1">
                                        <span>{fullName}</span>
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })()}
                            </div>  
                          </div>
                        ):col.toLowerCase() === "phone" ? (
                          <span className="flex gap-3 text-[12px] font-[400]">
                            <span className="text-[14px]">{getColumnValue(row, col)}</span>
                            {tableType !== 'team' && <span style={{cursor:'pointer'}}><BsFillTelephoneOutboundFill color='#4287f5' /></span>}
                          </span>
                        ) :col.toLowerCase() === "updatedat" ? (
                          <span className="flex gap-3 text-[12px] font-[400] ">
                            <span className="text-[14px]">{formatDate(getColumnValue(row, col))}</span>
                          </span>
                        ):col.toLowerCase() === "createdat" ? (
                          <span className="flex gap-3 text-[12px] font-[400] ">
                            <span className="text-[14px]">{formatDate(getColumnValue(row, col))}</span>
                          </span>
                        ):
                        
                        
                        col.toLowerCase() === 'leadscore'? (
                              <div className="flex justify-center">
                                <div className="px-2 py-1 rounded bg-[#F0FDF4] text-[#15803D] text-[14px] text-sm font-medium">
                                  {/* {isNaN(Number(getColumnValue(row, col))) 
                                    ? row[col] 
                                    : (Number(row[col]) > 0 ? `+${Number(row[col])}` : Number(row[col]))} */}
                                    {isNaN(Number(getColumnValue(row, col))) 
                                      ? String(getColumnValue(row, col)) // Convert objects to strings safely
                                      : (Number(getColumnValue(row, col)) > 0 ? `+${Number(getColumnValue(row, col))}` : Number(getColumnValue(row, col)))}

                                </div>
                              </div>
                            ):col.toLowerCase() === 'assignedowner'? (
                              <div className="h-full flex items-center" title={getAssignedOwnerEmail(row)} >
                                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-medium">
                                  {/* {typeof row[col] === "object" ? row[col]?.[col] ?? "-" : row[col]?.split(' ').map((n: string) => n[0]).join('')} */}
                                  {typeof row[col] === "object" 
                                    ? getAssignedOwnerName(row)?.split(" ").map((word: string) => word[0]?.toUpperCase()).join("") ?? "-" 
                                    : getAssignedOwnerName(row)?.split(" ").map((word: string) => word[0]?.toUpperCase()).join("")
                                  }
                                </div>
                                <span className="ml-2 text-sm text-gray-800 text-[14px]">{getAssignedOwnerName(row)}</span>
                              </div>
                            ):
                        (
                          <span
                            className={`rounded-[8px] text-[14px] font-[400] ${columnStyles[col]}`}
                            style={col === 'status' ? { color: getStatusColor(Number(getColumnValue(row, col))), backgroundColor:'#f0f0f0', padding: '5px', fontWeight:'bold', fontFamily:'Arial' } : col.toLowerCase() === 'board' ? {padding:'5px'}: col.toLowerCase() === 'class' ? {padding:'5px'}:undefined}
                          >
                            <span className={`text-[14px]`}>
                              {col === "class" ? extractGrade(getColumnValue(row, col)) : col === 'status' ? getStatusLabel(Number(getColumnValue(row, col))) : getColumnValue(row, col) || "-"}
                            </span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {isPanelOpen && (
        <SlideInPanel isOpen={isPanelOpen} setIsOpen={setIsPanelOpen}>
          <DetailedPage />
        </SlideInPanel>
      )} */}
    </DndProvider>
  );
};

export default DynamicTable3;