export interface IOpenTaskData {
    StudentName: string;
    Class: string;
    PhoneNumber: string;
    Status: string;
    CreatedBy: string;
    CreatedAt: string;
  }

export interface ITableFields {
  [key: string]: string | object; // Allows any string as a key
}

export interface ILeadFields {
  [key: string]: string | object; // Allows any string as a key
}

// export interface ILeadFields {
//   name: string
//   phone: string
//   favorite: string
//   region: string
//   assignedOwner: {
//     name:string,
//     email:string,
//     _id:string
//   }
//   createdAt: string 
//   updatedAt: string
//   status: string
//   leadscore: string
//   class: string
//   email: string
//   createdBy: string
// }



  