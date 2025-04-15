import { ILeadFields } from '@/interfaces'
import { ColumnDef } from '@tanstack/react-table'
import { getCheckboxColumn, renderNameCell } from '../helpers/renderers'
// import { generateUniqueId } from '../helpers'

export type User = {
  name: string
  phone: string
  favorite: boolean
  region: string
  assignedOwner: string
  createdAt: string | Date
  updatedAt: string | Date
  status: string
  leadscore: number
  class: string
  email: string
  createdBy: string
}

// userColumns.ts
export const getUserColumns = (
  handleFavoriteToggle: (id: string, favorite: boolean) => void
): ColumnDef<ILeadFields>[] => [
  getCheckboxColumn<ILeadFields>(),
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) =>
      renderNameCell({
        ...props,
        onFavoriteToggle: handleFavoriteToggle,
      }),
    meta: {
      headerClassName: {
      backgroundColor: '#d1d5db', // #f3f4f6    #d1d5db
    },
    cellClassName: {
      backgroundColor: '#ffffff',
    },
    style: {
      backgroundColor: '#d4d3d2', // equivalent to Tailwind's bg-red-100
    },
    
  },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => info.getValue(),
    meta: {
      headerClassName: {
      backgroundColor: '#d1d5db',
    },
    cellClassName: {
      backgroundColor: '#ffffff',
    },
      style: {
        backgroundColor: '#d4d3d2', // equivalent to Tailwind's bg-red-100
      },
  
    },
    size: 150,
  },
];

