// 'use client';
// import { QueryState } from "@/interfaces/tableFilterTypes";
// import React, { useState, useEffect } from "react";
// import { IoIosSearch } from "react-icons/io";

// interface SearchBoxProps<T> {
//   placeholder?: string;
//   setFilter?: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
//   iconSize?: number;
//   iconColor?: string;
//   height?: string | number;
//   width?: string | number;
//   responsive?: boolean; // New prop to enable responsiveness
// }

// const SearchBox = <T,>({
//   setFilter,
//   placeholder,
//   iconSize,
//   iconColor,
//   responsive = false,
// }: SearchBoxProps<T>) => {
//   const [query, setQuery] = useState("");
//   const [showInput, setShowInput] = useState(true);

//   useEffect(() => {
//     if (responsive) {
//       const handleResize = () => {
//         setShowInput(window.innerWidth > 900);
//       };

//       handleResize(); // Initial check
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, [responsive]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && query.trim() !== "") {
//       setFilter?.((prev) => ({
//         ...prev,
//         filters: [
//           ...prev.filters, // Keep existing filters
//           {
//             operator: "CONTAINS",
//             value: query,
//           },
//         ],
//       }));
//     }
//   };

//   return (
//     <div
//       className={`flex items-center w-full gap-2 border border-[#C6CCE0] rounded-md ${showInput ? 'p-2' : ''}`}
//     >
//       <IoIosSearch size={iconSize} color={iconColor} />
//       {showInput && (
//         <input
//           type="text"
//           name="search-leads"
//           placeholder={placeholder}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="outline-none bg-transparent w-full text-[#5A6793] placeholder-[#5A6793]"
//         />
//       )}
//     </div>
//   );
// };

// export default SearchBox;

// 'use client';
// import { QueryState } from "@/interfaces/tableFilterTypes";
// import React, { useState, useEffect } from "react";
// import { IoIosSearch } from "react-icons/io";

// interface SearchBoxProps {
//   placeholder?: string;
//   setFilter?: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
//   iconSize?: number;
//   iconColor?: string;
//   height?: string | number;
//   width?: string | number;
//   responsive?: boolean; // New prop to enable responsiveness
// }

// const SearchBox = ({
//   setFilter,
//   placeholder,
//   iconSize,
//   iconColor,
//   responsive = false,
// }: SearchBoxProps) => {
//   const [query, setQuery] = useState("");
//   const [showInput, setShowInput] = useState(true);

//   useEffect(() => {
//     if (responsive) {
//       const handleResize = () => {
//         setShowInput(window.innerWidth > 900);
//       };

//       handleResize(); // Initial check
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, [responsive]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && query.trim() !== "") {
//       setFilter?.((prev) => ({
//         ...prev,
//         filters: [
//           ...prev.filters, // Keep existing filters
//           {
//             operator: "CONTAINS",
//             value: query,
//           },
//         ],
//       }));
//     }
//   };

//   return (
//     <div
//       className={`flex items-center w-full gap-2 border border-[#C6CCE0] rounded-md ${showInput ? 'p-2' : ''}`}
//     >
//       <IoIosSearch size={iconSize} color={iconColor} />
//       {showInput && (
//         <input
//           type="text"
//           name="search-leads"
//           placeholder={placeholder}
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="outline-none bg-transparent w-full text-[#5A6793] placeholder-[#5A6793]"
//         />
//       )}
//     </div>
//   );
// };

// export default SearchBox;

"use client";
import { QueryState } from "@/interfaces/tableFilterTypes";
import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchBoxProps {
  placeholder?: string;
  setFilter?: (query: QueryState | ((prev: QueryState) => QueryState)) => void;
  iconSize?: number;
  iconColor?: string;
  height?: string | number;
  width?: string | number;
  responsive?: boolean;
}

const SearchBox = ({
  setFilter,
  placeholder,
  iconSize,
  iconColor,
  responsive = false,
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    if (responsive) {
      const handleResize = () => {
        setShowInput(window.innerWidth > 900);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [responsive]);

  useEffect(() => {
    setFilter?.((prev) => {
      const updatedFilters = prev.filters.filter((f) => f.operator !== "CONTAINS");

      if (query.trim() !== "") {
        updatedFilters.push({ operator: "CONTAINS", value: query });
      }

      return { ...prev, filters: updatedFilters };
    });
  }, [query, setFilter]);

  return (
    <div
      className={`flex items-center w-full gap-2 border border-[#C6CCE0] rounded-md ${
        showInput ? "p-2" : ""
      }`}
    >
      <IoIosSearch size={iconSize} color={iconColor} />
      {showInput && (
        <input
          type="text"
          name="search-leads"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none bg-transparent w-full text-[#5A6793] placeholder-[#5A6793]"
        />
      )}
    </div>
  );
};

export default SearchBox;



