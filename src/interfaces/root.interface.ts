export interface IEditStatus {
    statusid: number;
    label: string;
    color: string;
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
    // icon:string;
}

export interface CreatedLeadField {
  _id: string;
  name: string;
  type: string;
  options: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  active?: boolean;
}
  