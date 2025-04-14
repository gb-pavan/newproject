// // src/types/react-table.d.ts
// import { ColumnMeta } from '@tanstack/react-table';

// declare module '@tanstack/react-table' {
//   interface ColumnMeta<TData extends unknown, TValue> {
//     style?: React.CSSProperties;
//     sticky?:boolean
//   }
// }

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-unnecessary-type-constraint */

// src/types/react-table.d.ts
import { ColumnMeta } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    style?: React.CSSProperties;
    sticky?: boolean;
  }
}

