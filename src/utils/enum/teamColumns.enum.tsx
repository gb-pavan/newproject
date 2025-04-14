// import { ColumnDef } from '@tanstack/react-table';
// import { IEmployee } from '@/interfaces';
// import { getCheckboxColumn } from '../helpers/renderers';

// export const getEmployeeColumns = (): ColumnDef<IEmployee>[] => [
//   getCheckboxColumn<IEmployee>(),
//   {
//     accessorKey: 'name',
//     header: 'Name',
//     cell: (info) => info.getValue(),
//     meta: {
//       style: {
//         backgroundColor: '#ffffff',
//       },
//     },
//   },
//   {
//     accessorKey: 'role',
//     header: 'Role',
//     cell: (info) => info.getValue(),
//     meta: {
//       style: {
//         backgroundColor: '#ffffff',
//       },
//     },
//   },
//   {
//     accessorKey: 'department',
//     header: 'Department',
//     cell: (info) => info.getValue(),
//     meta: {
//       style: {
//         backgroundColor: '#ffffff',
//       },
//     },
//   },
//   {
//     accessorKey: 'email',
//     header: 'Email',
//     cell: (info) => info.getValue(),
//     meta: {
//       style: {
//         backgroundColor: '#ffffff',
//       },
//     },
//   },
//   {
//     accessorKey: 'phone',
//     header: 'Phone',
//     cell: (info) => info.getValue(),
//     meta: {
//       style: {
//         backgroundColor: '#ffffff',
//       },
//     },
//   },
// ];

import { ColumnDef } from '@tanstack/react-table';
import { IEmployee } from '@/interfaces';
import { getCheckboxColumn } from '../helpers/renderers';

export const getEmployeeColumns = (): ColumnDef<IEmployee>[] => [
  getCheckboxColumn<IEmployee>(),
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    meta: {
      style: {
        backgroundColor: 'bg-gray-200',
      },
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: (info) => info.getValue(),
    meta: {
      style: {
        backgroundColor: 'bg-gray-200',
      },
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
    meta: {
      style: {
        backgroundColor: 'bg-gray-200',
      },
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: (info) => info.getValue(),
    meta: {
      style: {
        backgroundColor: 'bg-gray-200',
      },
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: (info) => info.getValue(),
    meta: {
      style: {
        backgroundColor: 'bg-gray-200',
      },
    },
  },
];

