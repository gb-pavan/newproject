export interface IEmployee {
    name: string;
    intial?: string;
    email?: string;
    password?: string;
    department?: "Sales" | "Marketing";
    role: "admin" | "user"; // Add more roles if needed
    permission?: "full" | "restricted"; // Define more permission levels if needed
    reporting?: string; // Optional field
    phone?: string;
  }

  export interface IEmployeeDetails {
    _id: string;
    name: string;
    email: string;
    role: string;
    permission: string;
    phone: string;
    region: string[];
    ivrActive: boolean;
    createdBy: string;
    department: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    depth: number;
    reporting?: string;
}