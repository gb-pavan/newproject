export interface IEditStatus {
    statusid: number;
    label: string;
    color: string;
    backgroundColor:string;
    _id?: string;
}

export interface IStage {
    _id: string;
    stageid: string;
    stageType: string;
    visibility: boolean;
    activeStatuses: IEditStatus[];
    archivedStatuses: IEditStatus[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IEditableStatusBox {
    statusid: string;
    label: string;
    color: string;
    backgroundColor:string;
    // icon:string;
}

// export interface CreatedLeadField {
//   _id: string;
//   name: string;
//   type: string;
//   options: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   active?: boolean;
// }

export interface CreatedLeadField {
  _id: string;
  name: string;
  type: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  active: boolean;
  columnIconCode: string;
  columnColor: string;
  position: number;
  isForm: boolean;
  required: boolean;
  format: string;
}

  