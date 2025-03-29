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