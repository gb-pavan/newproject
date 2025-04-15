import React from 'react';
import { ILeadFields } from '@/interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { IStatus } from '@/interfaces/tableFilterTypes';
import { formatDate } from '../helpers';

const createDynamicColumns = (data: ILeadFields[],statusStyles:IStatus[]): ColumnDef<ILeadFields>[] => {
  const dynamicColumns: ColumnDef<ILeadFields>[] = [];

  if (!data || data.length === 0) return dynamicColumns;

  const addedKeys = new Set<string>();

  // Filter selected columns data
  const selectedColumnsData = data.map(row =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) => key !== 'name' && key !== 'phone' && key !== '_id')
    )
  );

  selectedColumnsData.forEach((eachRow) => {

    Object.keys(eachRow).forEach((key) => {
  if (addedKeys.has(key)) return;
  addedKeys.add(key);

  const value = eachRow[key];

  // If value is an object (specifically checking assignedOwner)
  if (typeof value === 'object' && value !== null) {
    console.log("is object", value);
    if (key === 'assignedOwner') {
      dynamicColumns.push({
        accessorKey: key,
        header: 'Assigned Owner',  // Custom header format
        cell: (info) => {
          const owner = info.getValue() as { _id: string; email: string; name: string };
          return <span title={owner?.email ?? ''}>{owner?.name ?? ''}</span>;
        },
        size: 200,
      });
    } else {
      // Handle other object fields if needed, or log them
      console.log(`Skipping field ${key} as it is an object`);
    }
  } else {
    if (key === 'status') {
      dynamicColumns.push({
        accessorKey: key,
        header: 'Status',
        cell: (info) => {
          const statusCode = info.getValue() as number;
          const styleObj = statusStyles.find(s => s.statusid === statusCode);

          if (!styleObj) return <span>{statusCode}</span>;

          return (
            <span
              style={{
                backgroundColor: styleObj.backgroundColor,
                color: styleObj.color,
                fontSize: styleObj.fontSize,
                padding: '2px 4px',
                borderRadius: '8px',
              }}
            >
              {styleObj.label}
            </span>
          );
        },
        size: 180,
      });
    }  else if (['createdAt', 'updatedAt'].includes(key)) {
  dynamicColumns.push({
    accessorKey: key,
    header: key === 'createdAt' ? 'Created At' : 'Updated At',
    cell: (info) => {
      const date = info.getValue();
      return <span>{formatDate(date as string)}</span>;
    },
    size: 180,
  });
}else if (key === 'board') {
  // custom style for board
  dynamicColumns.push({
    accessorKey: key,
    header: 'Board',
    cell: (info) => {
      const boardValue = info.getValue() as string;
      return (
        <span
          style={{
            backgroundColor: '#e0e7ff',
            color: '#1e3a8a',
            padding: '2px 6px',
            borderRadius: '6px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '0.875rem',
          }}
        >
          {boardValue}
        </span>
      );
    },
    size: 160,
  });
}else {
      // For primitive values, create columns for them
      dynamicColumns.push({
        accessorKey: key,
        header: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize the first letter
        cell: (info) => info.getValue(),
        size: 150,
      });
    }
  }
});

  });

  return dynamicColumns;
};

export default createDynamicColumns;


