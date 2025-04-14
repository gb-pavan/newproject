// import { QueryState } from "@/interfaces/tableFilterTypes";
// import React, { useState, useRef, useEffect } from "react";

// interface DraggableDropdownDemoProps {
//   options?: string[];
//   selectedCols?: string[];
//   setQuery: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
// }

// const DraggableDropdownDemo: React.FC<DraggableDropdownDemoProps> = ({
//   options,
//   selectedCols,
//   setQuery,
// }) => {
//   const [columns, setColumns] = useState<string[]>([]);
//   const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Sync columns and visibleColumns with props, but only update when they change
//   useEffect(() => {
//     if (options && !options.every((col, idx) => col === columns[idx])) {
//       setColumns(options);
//     }
//     if (selectedCols && !selectedCols.every((col, idx) => col === visibleColumns[idx])) {
//       setVisibleColumns(selectedCols);
//     }
//   }, [options, selectedCols, columns, visibleColumns]);

//   // Close the dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Only update query if visibleColumns has changed to prevent infinite loop
//   useEffect(() => {
//     console.log("visible columns change reflected");
//     setQuery((prev) => {
//       const prevSelected = prev.selectedFields || [];
//       const areEqual =
//         prevSelected.length === visibleColumns.length &&
//         prevSelected.every((val, i) => val === visibleColumns[i]);

//       if (areEqual) return prev; // no update needed

//       return {
//         ...prev,
//         selectedFields: visibleColumns,
//       };
//     });
//   }, [visibleColumns, setQuery]);

//   // Move items in the columns array
//   const moveItem = (fromIndex: number, toIndex: number) => {
//     const newOrder = [...columns!];
//     const [moved] = newOrder.splice(fromIndex, 1);
//     newOrder.splice(toIndex, 0, moved);
//     setColumns(newOrder);
//   };

//   // Handle checkbox change for column visibility
//   const handleCheckboxChange = (col: string) => {
//     setVisibleColumns((prev) =>
//       prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
//     );
//   };

//   // Handle drag start for column reordering
//   const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
//     e.dataTransfer.setData("text/plain", index.toString());
//   };

//   // Handle drop event for column reordering
//   const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
//     const fromIndex = Number(e.dataTransfer.getData("text/plain"));
//     moveItem(fromIndex, index);
//   };

//   return (
//     <div className="relative w-full p-4">
//       <div ref={dropdownRef} className="absolute right-0 top-0 cursor-pointer z-30">
//         <button
//           onClick={() => setDropdownOpen((prev) => !prev)}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
//         >
//           ⋮
//         </button>

//         {dropdownOpen && (
//           <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-lg shadow z-40 p-2">
//             <ul className="text-sm text-gray-800 overflow-y-auto" style={{ maxHeight: "200px" }}>
//               {columns?.map((col, index) => (
//                 <li
//                   key={col}
//                   className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded"
//                   draggable
//                   onDragStart={(e) => handleDragStart(e, index)}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => handleDrop(e, index)}
//                 >
//                   <span className="mr-2 text-gray-400 cursor-grab hover:cursor-grabbing">🤚</span>
//                   <label className="flex items-center gap-2 cursor-pointer flex-1">
//                     <input
//                       type="checkbox"
//                       checked={visibleColumns.includes(col)}
//                       onChange={() => handleCheckboxChange(col)}
//                     />
//                     {col}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DraggableDropdownDemo;

import { QueryState } from "@/interfaces/tableFilterTypes";
import React, { useState, useRef, useEffect } from "react";

interface DraggableDropdownDemoProps {
  options?: string[];
  selectedCols?: string[];
  setQuery: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
}

const DraggableDropdownDemo: React.FC<DraggableDropdownDemoProps> = ({
  options,
  selectedCols,
  setQuery,
}) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Sync columns and visibleColumns only on first render
  useEffect(() => {
    if (options && !options.every((col, idx) => col === columns[idx])) {
      setColumns(options);
    }

    if (isFirstRender.current && selectedCols) {
      setVisibleColumns(selectedCols);
      isFirstRender.current = false;
    }
  }, [options, selectedCols]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update query only when visibleColumns changes
  useEffect(() => {
    setQuery((prev) => {
      const prevSelected = prev.selectedFields || [];
      const areEqual =
        prevSelected.length === visibleColumns.length &&
        prevSelected.every((val, i) => val === visibleColumns[i]);

      if (areEqual) return prev;

      return {
        ...prev,
        selectedFields: visibleColumns,
      };
    });
  }, [visibleColumns, setQuery]);

  // Move items in the columns array
  const moveItem = (fromIndex: number, toIndex: number) => {
    const newOrder = [...columns];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    setColumns(newOrder);
  };

  // Toggle visibility of a column
  const handleCheckboxChange = (col: string) => {
    setVisibleColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    const fromIndex = Number(e.dataTransfer.getData("text/plain"));
    moveItem(fromIndex, index);
  };

  return (
    <div className="relative w-full p-4">
      <div ref={dropdownRef} className="absolute right-0 top-0 cursor-pointer z-30">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          ⋮
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-300 rounded-lg shadow z-40 p-2">
            <ul className="text-sm text-gray-800 overflow-y-auto" style={{ maxHeight: "200px" }}>
              {columns?.map((col, index) => (
                <li
                  key={col}
                  className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 rounded"
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <span className="mr-2 text-gray-400 cursor-grab hover:cursor-grabbing">🤚</span>
                  <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col)}
                      onChange={() => handleCheckboxChange(col)}
                    />
                    {col}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableDropdownDemo;


