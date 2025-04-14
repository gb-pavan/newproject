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
  // selectedId:"SYSTEM_FILTER_ALL_LEAD",
  selectedId?:string,
  search?:boolean,
  filters: Filter[];
  selectedFields?:string[]
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
  isDeleted: boolean,
  role: string,
  depth: number;
}

export interface IStatus {
    statusid: number;
    label: string;
    color: string;
    backgroundColor: string;
    fontSize: string;
    _id: string;
}


