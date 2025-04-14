// "use client";

// import React from "react";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { cn } from "@/utils/cn";

// interface TableProps<TData> {
//   data?: TData[];
//   columns?: ColumnDef<TData, unknown>[];
//   className?: string;
//   stickyColumns?: string[];
// }

// export function DynamicTable<TData>({
//   data = [],
//   columns = [],
//   className,
//   stickyColumns = [],
// }: TableProps<TData>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (!data.length || !columns.length) {
//     return (
//       <div className={cn("p-4 text-gray-500 text-sm italic", className)}>
//         No data or columns provided.
//       </div>
//     );
//   }
//   console.log("new table data",data);

//   return (
//     <div className={cn("rounded-xl border border-gray-200 overflow-x-auto mt-4", className)}>
//       <table className="min-w-full text-sm text-left table-fixed">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 const isSticky = stickyColumns.includes(header.column.id);
//                 return (
//                   <th
//                     key={header.id}
//                     // className={cn(
//                     //   "px-4 py-2 font-semibold text-gray-700 whitespace-nowrap",
//                     //   isSticky && "sticky left-0 bg-gray-100 z-10 shadow border-2 border-gray-300"
//                     // )}
//                     className={cn(
//                       "px-4 py-2 font-semibold text-gray-700 whitespace-nowrap border-l-2 border-gray-300",
//                       isSticky && "sticky left-0 bg-gray-100 z-10 shadow"
//                     )}
//                     style={{ width: header.column.getSize() ?? 150 }}
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(header.column.columnDef.header, header.getContext())}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
//               {row.getVisibleCells().map((cell) => {
//                 const isSticky = stickyColumns.includes(cell.column.id);
//                 return (
//                   <td
//                     key={cell.id}
//                     // className={cn(
//                     //   "px-4 py-2 whitespace-nowrap",
//                     //   isSticky && "sticky left-0 bg-white z-0"
//                     // )}
//                     className={cn(
//                       "px-4 py-2 whitespace-nowrap border-l-2 border-gray-200",
//                       isSticky && "sticky left-0 bg-white z-0"
//                     )}
//                     style={{ width: cell.column.getSize() ?? 150 }}
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// "use client";

// import React from "react";
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import { cn } from "@/utils/cn";

// interface TableProps<TData> {
//   data?: TData[];
//   columns?: ColumnDef<TData, unknown>[];
//   className?: string;
//   stickyColumns?: string[];
// }

// export function DynamicTable<TData>({
//   data = [],
//   columns = [],
//   className,
//   stickyColumns = [],
// }: TableProps<TData>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   const getStickyStyle = (columnId: string): React.CSSProperties => {
//     const index = stickyColumns.indexOf(columnId);
//     if (index === -1) return {};

//     let leftOffset = 0;
//     for (let i = 0; i < index; i++) {
//       const prevId = stickyColumns[i];
//       const col = table.getAllLeafColumns().find(c => c.id === prevId);
//       if (col) {
//         leftOffset += col.getSize();
//       }
//     }

//     return {
//       position: "sticky",
//       left: leftOffset,
//       zIndex: 10,
//       background: "inherit",
//     };
//   };

//   const getHeaderClasses = (columnId: string) =>
//     cn(
//       "px-4 py-2 font-semibold text-gray-700 whitespace-nowrap border-l-2 border-gray-200",
//       stickyColumns.includes(columnId) && "border-r-1 bg-gray-100"
//     );

//   const getCellClasses = (columnId: string) =>
//     cn(
//       "px-4 py-2 whitespace-nowrap border-l-2 border-gray-200",
//       stickyColumns.includes(columnId) && "z-0 border-r-2 bg-white"
//     );

//   if (!data.length || !columns.length) {
//     return (
//       <div className={cn("p-4 text-gray-500 text-sm italic", className)}>
//         No data or columns provided.
//       </div>
//     );
//   }

//   return (
//     <div className={cn("rounded-xl border border-gray-200 overflow-x-auto mt-4", className)}>
//       <table className="min-w-full text-sm text-left table-fixed">
//         <thead className="bg-gray-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   style={{
//                     width: header.column.getSize() ?? 150,
//                     ...getStickyStyle(header.column.id),
//                   }}
//                   className={getHeaderClasses(header.column.id)}
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(header.column.columnDef.header, header.getContext())}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
//               {row.getVisibleCells().map((cell) => (
//                 <td
//                   key={cell.id}
//                   style={{
//                     width: cell.column.getSize() ?? 150,
//                     ...getStickyStyle(cell.column.id),
//                   }}
//                   className={getCellClasses(cell.column.id)}
//                 >
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  RowSelectionState,
  getPaginationRowModel,
  // useRowSelection,
} from "@tanstack/react-table";
import React from "react";
import { cn } from "@/utils/cn";

interface TableProps<TData> {
  data?: TData[];
  columns?: ColumnDef<TData, unknown>[];
  className?: string;
  stickyColumns?: string[];
  onSelectionChange?: (selectedRows: TData[]) => void;
}

export function DynamicTable<TData>({
  data = [],
  columns = [],
  className,
  stickyColumns = [],
  onSelectionChange,
}: TableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  console.log("static and dynamic columns",columns);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Optional: send selected rows back to parent
  React.useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    onSelectionChange?.(selectedRows);
  }, [rowSelection]);

  const getStickyStyle = (columnId: string): React.CSSProperties => {
    const index = stickyColumns.indexOf(columnId);
    if (index === -1) return {};

    let leftOffset = 0;
    for (let i = 0; i < index; i++) {
      const prevId = stickyColumns[i];
      const col = table.getAllLeafColumns().find((c) => c.id === prevId);
      if (col) {
        leftOffset += col.getSize();
      }
    }

     // Adjust for the checkbox column specifically to ensure it stays sticky.
    if (columnId === "select") {
      return {
        position: "sticky",
        left: 0,  // No need to add offset, it’s always at the start
        zIndex: 10,
        background: "inherit",
      };
    }

    return {
      position: "sticky",
      left: leftOffset,
      zIndex: 10,
      background: "inherit",
          boxShadow: "2px 0 0 0 #e5e7eb", // ← simulate right border

    };
  };

  const getHeaderClasses = (columnId: string) =>
    cn(
      "px-4 py-2 font-semibold text-gray-700 whitespace-nowrap border-l-2 border-gray-200",
      stickyColumns.includes(columnId) && "bg-gray-100"
    );

  const getCellClasses = (columnId: string) =>
    cn(
      "px-4 py-2 whitespace-nowrap border-l-2 border-gray-200",
      stickyColumns.includes(columnId) && "bg-white"
    );

  if (!data.length || !columns.length) {
    return (
      <div className={cn("p-4 text-gray-500 text-sm italic", className)}>
        No data or columns provided.
      </div>
    );
  }


  return (
    <div className={cn("rounded-xl border border-gray-200 overflow-x-auto mt-4", className)}>
      <table className="min-w-full text-sm text-left table-fixed">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.column.getSize() ?? 150,
                    ...getStickyStyle(header.column.id),
                    ...(header.column.columnDef.meta?.style ?? {}),
                  }}
                  className={getHeaderClasses(header.column.id)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize() ?? 150,
                    ...getStickyStyle(cell.column.id),
                    ...(cell.column.columnDef.meta?.style ?? {}),
                  }}
                  className={getCellClasses(cell.column.id)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


