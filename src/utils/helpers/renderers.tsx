// import { FaRegStar, FaStar } from "react-icons/fa";

// // utils/renderers.ts or wherever appropriate
// export const renderNameCell = ({ row, getValue }) => {
//     const name = getValue();
//     const isFavorite = row.original.favorite;
  
//     return (
//       <div className="flex items-center space-x-2">
//         <span
//           className="text-yellow-500 cursor-pointer"
//           title={name.length > 20 ? name : ""}
//         >
//           {isFavorite ? <FaStar color="#fcba03" /> : <FaRegStar color="black" />}
//         </span>
//         <span className="truncate max-w-[150px]">{name}</span>
//       </div>
//     );
// };

import { ILeadFields } from "@/interfaces";
import { CellContext } from "@tanstack/react-table";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ColumnDef } from '@tanstack/react-table'; // Adjust the import based on your package
import { capitalizeWords } from ".";


// export const renderNameCell = ({
//   row,
//   getValue,
// }: CellContext<ILeadFields, unknown>) => {

//   const { name, favorite } = getValue() as { name: string; favorite: boolean };

//   const displayedName = capitalizeWords(name);


//   return (
//     <div className="flex items-center space-x-2">
//       <span
//         className="text-yellow-500 cursor-pointer"
//         title={name.length > 20 ? name : ""}
//         key={generateUniqueId()+name}
//       >
//         {favorite ? <FaStar color="#fcba03" /> : <FaRegStar color="black" />}
//       </span>
//       <span className="truncate max-w-[150px]">{displayedName}</span>
//     </div>
//   );
// };

// export const renderNameCell = (
//   props: CellContext<ILeadFields, unknown> & {
//     onFavoriteToggle: (id: string, favorite: boolean) => void;
//   }
// ) => {
//   const { row, getValue, onFavoriteToggle } = props;
//   const { name, favorite } = getValue() as { name: string; favorite: boolean };
//     // const { name, favorite } = row.original;
//   console.log("name favorite",name,favorite);
//   const displayedName = capitalizeWords(name as string);

//   const handleFavoriteClick = () => {
//     console.log("yes in side trigger");
//     onFavoriteToggle(row.original._id as string , favorite); // Assuming `id` is in your row data
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <span
//         className="text-yellow-500 cursor-pointer"
//         title={name.length > 20 ? name : ""}
//         onClick={handleFavoriteClick}
//       >
//         {favorite ? <FaStar color="#fcba03" /> : <FaRegStar color="black" />}
//       </span>
//       <span className="truncate max-w-[150px]">{displayedName}</span>
//     </div>
//   );
// };

// export const renderNameCell = (
//   props: CellContext<ILeadFields, unknown> & {
//     onFavoriteToggle: (id: string, favorite: boolean) => void;
//   }
// ) => {
//   const { row, getValue, onFavoriteToggle } = props;

//   const value = getValue() as { name?: unknown; favorite?: unknown } | undefined;

//   const rawName = value?.name ?? row.original.name;
//   const rawFavorite = value?.favorite ?? row.original.favorite;

//   // Ensure proper types
//   const name = typeof rawName === 'string' ? rawName : '';
//   const favorite = typeof rawFavorite === 'boolean' ? rawFavorite : false;

//   const displayedName = capitalizeWords(name);

//   const handleFavoriteClick = () => {
//     console.log("yes inside trigger");
//     onFavoriteToggle(row.original._id as string, favorite);
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <span
//         className="cursor-pointer"
//         title={name.length > 20 ? name : ""}
//         onClick={handleFavoriteClick}
//       >
//         {favorite ? <FaStar color="#fcba03" /> : <FaRegStar color="black" />}
//       </span>
//       <span className="truncate max-w-[150px]">{displayedName}</span>
//     </div>
//   );
// };

export const renderNameCell = (
  props: CellContext<ILeadFields, unknown> & {
    onFavoriteToggle: (id: string, favorite: boolean) => void;
  }
) => {
  const { row, getValue, onFavoriteToggle } = props;

  const value = getValue() as { name?: unknown; favorite?: unknown } | undefined;

  const rawName = value?.name ?? row.original.name;
  const rawFavorite = value?.favorite ?? row.original.favorite;

  const name = typeof rawName === "string" ? rawName : "";
  const favorite = typeof rawFavorite === "boolean" ? rawFavorite : false;

  const displayedName = capitalizeWords(name);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(row.original._id as string, favorite);
  };

  return (
    <div className="flex items-center gap-2 text-[14px] font-[400] whitespace-nowrap">
      <div
        onClick={handleFavoriteClick}
        style={{ cursor: "pointer" }}
      >
        {favorite ? (
          <FaStar color="#fcba03" />
        ) : (
          <FaRegStar color="black" />
        )}
      </div>

      {/* Truncated name with tooltip on hover */}
      <div className="relative group">
        <span
          className="flex items-center max-w-[120px] inline-block overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
          onClick={() => console.log("Name clicked:", name)}
          title={displayedName.length > 20 ? displayedName : ""}
        >
          {displayedName || "-"}
        </span>

        {/* Tooltip on hover if name is long */}
        {displayedName.length > 20 && (
          <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white text-black p-2 rounded-md text-sm z-50 whitespace-nowrap shadow-lg">
            <div className="flex items-center text-[14px] cursor-pointer whitespace-nowrap gap-1">
              <span>{displayedName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};





// export const getCheckboxColumn = <TData,>(): ColumnDef<TData, unknown> => ({
//   id: "select",
//   header: ({ table }) => (
//     <input
//       type="checkbox"
//       checked={table.getIsAllPageRowsSelected()}
//       onChange={table.getToggleAllPageRowsSelectedHandler()}
//     />
//   ),
//   cell: ({ row }) => (
//     <input
//       type="checkbox"
//       checked={row.getIsSelected()}
//       disabled={!row.getCanSelect()}
//       onChange={row.getToggleSelectedHandler()}
//     />
//   ),
//   size: 40,
//   meta: {
//     sticky: true,
//     style: {
//       backgroundColor: 'bg-gray-200', // equivalent to Tailwind's bg-red-100
//     },
//   },
// });

export const getCheckboxColumn = <TData,>(): ColumnDef<TData, unknown> => ({
  id: "select",
  header: ({ table }) => (
    <div className="w-10 flex justify-center">
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    </div>
  ),
  cell: ({ row }) => (
    <div className="w-10 flex justify-center">
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    </div>
  ),
  size: 40,
  meta: {
    sticky: true,
    style: {
      width: '40px',
      minWidth: '40px',
      maxWidth: '40px',
      backgroundColor: 'bg-gray-300',
    },
  },
});


