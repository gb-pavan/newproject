// export type FilterState<T extends Record<string, any> = {}> = T & {
//   status: string[],
//   searchString?: string;
//   singleDate?: Date;
//   dateRange?: { startDate?: Date; endDate?: Date };
// };

export type FilterState<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  status: string[];
  searchString?: string;
  singleDate?: Date;
  dateRange?: { startDate?: Date; endDate?: Date };
};

export interface Filter {
  field?: string;
  operator: string;
  value: string[] | string;
}

export interface QueryState {
  filters: Filter[];
  logic: "AND";
  pagination: {
    page: number;
    limit: number;
  };
}

export interface IAssignee {
  _id: string;
  name: string;
  email: string;
  depth: number;
}

export interface IStatus {
    statusid: number;
    label: string;
    color: string;
    _id: string;
}


