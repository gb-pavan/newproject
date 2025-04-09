// export interface IEmployee {
//     name: string;
//     intial?: string;
//     email?: string;
//     password?: string;
//     department?: "Sales" | "Marketing";
//     role: "admin" | "user"; // Add more roles if needed
//     permission?: "full" | "restricted"; // Define more permission levels if needed
//     reporting?: string; // Optional field
//     reportees?:string;
//     phone?: string;
//     ivrActive: boolean; // ✅ Add this line
//   }

export interface IEmployee {
  name?: string;
  initial?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user" | ""; // Add "" here
  phone?: string;
  department?: "Sales" | "Marketing" | "" | undefined; // Add "" here
  reporting?: string;
  reportees?: string[];
  ivrActive?: boolean;
  region?:string
}


//   export interface IEmployeeDetails {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
//     permission: string;
//     phone: string;
//     region: string[];
//     ivrActive: boolean;
//     createdBy: string;
//     department: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//     depth: number;
//     reporting?: string;
// }

export interface Region {
  _id: string;
  name: string;
}

export interface IEmployeeDetails {
  _id: string;
  name: string;
  initial: string;
  email: string;
  password?: string;
  role: string;
  permission: string;
  reporting: string;
  phone: string;
  region?: Region[];
  ivrActive: boolean;
  isDeleted: boolean;
  department: string;
  createdBy: string;
  tokens?: string[]; // You can replace `any` with a specific type if you know the structure of tokens
  createdAt: string; // Consider using `Date` if working directly with JS Date objects
  updatedAt: string;
  __v: number;
}
