// import { StorageKey } from '@/utils/enum';

import { RegionOption } from "@/interfaces/form.interface";
import { TimeRangeType } from "../constants/timeRanges";
import { IStage } from '@/interfaces/root.interface';
import { IAssignee, IStatus } from '@/interfaces/tableFilterTypes';

// export const getToken = () => {
//   // const role = localStorage.getItem(StorageKey.ROLE) || Role.STUDENT;
//   // const token = localStorage.getItem(`${role}${StorageKey.TOKEN}`);
//   const token = localStorage.getItem(`${StorageKey.TOKEN}`);
//   return token;
// };

export const getToken = () => {
  const authData = localStorage.getItem("authData");
  if (!authData) return { token: null }; // Default role if no data exists

  try {
    return JSON.parse(authData);
  } catch (error) {
    console.error("Error parsing authData:", error);
    return { token: null };
  }
};

export function getUserRole(): string | null {
  if (typeof window === "undefined") {
    return null; // Prevents execution on the server
  }

  const authData = localStorage.getItem("authData");
  if (!authData) return null;

  try {
    const parsed = JSON.parse(authData);
    return parsed?.role || null;
  } catch (error) {
    console.error("Failed to parse authData from localStorage:", error);
    return null;
  }
}



export function formatToLocalTime(isoDate: string): string {
  // Ensure `isoDate` is provided and valid
  if (!isoDate) {
    return "Invalid Date";
  }

  const date = new Date(isoDate); // Parse ISO date string

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date NaN";
  }

  // Extract components of the date
  const day = date.getDate(); // Day of the month (1-31)
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase(); // Abbreviated month (e.g., APR)
  const year = date.getFullYear(); // Full year (e.g., 2024)

  // Extract time components
  const hours = date.getHours(); // Hours (0-23)
  const minutes = date.getMinutes(); // Minutes (0-59)

  // Format time in 12-hour format with AM/PM
  const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")}${
    hours >= 12 ? "PM" : "AM"
  }`;

  // Return the custom format: "4 APR, 2024 4:45PM"
  return `${day} ${month}, ${year} ${formattedTime}`;
}

export function capitalizeWords(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export const getAllKeys = <T extends Record<string, unknown>>(data: T[]): string[] => {
  return Array.from(new Set(data.flatMap((row) => Object.keys(row))));
};

export const getDateRange = (range: TimeRangeType) => {
  const today = new Date();
  let startDate: Date;
  let endDate: Date;

  switch (range) {
    case "All":
      startDate = new Date(1970, 0, 1, 0, 0, 0, 0); // Unix epoch start
      endDate = new Date(2099, 11, 31, 23, 59, 59, 999); // Arbitrary far future date
      break;

    case "Today":
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
      break;

    case "Yesterday":
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1, 0, 0, 0, 0));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 1, 23, 59, 59, 999));
      break;

    case "This Week":
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay(), 0, 0, 0, 0));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + (6 - today.getUTCDay()), 23, 59, 59, 999));
      break;

    case "Last Week":
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay() - 7, 0, 0, 0, 0));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - today.getUTCDay() - 1, 23, 59, 59, 999));
      break;

    case "This Month":
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1, 0, 0, 0, 0));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, 0, 23, 59, 59, 999));
      break;

    case "Last Month":
      startDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1, 0, 0, 0, 0));
      endDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0, 23, 59, 59, 999));
      break;

    default:
      throw new Error(`Invalid range provided: ${range}`);
  }

  return { startDate, endDate }; // Returns Date objects
};

export const formatCamelCase = (text: string): string => {
  return text
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .trim() // Remove leading/trailing spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export const getActiveStatusesByStageId = (stages: IStage[], stageId: string) => {
  const stage = stages?.find(stage => stage.stageid === stageId);
  return stage;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

interface DropdownOption {
  label: string;
  value: string | number;
  icon?: string; // Icon name as string
  color?: string;
  addDeco?:boolean;
  showCheckbox?: boolean;
}

export const mapStatusToDropdownOptions = (
    statuses: IStatus[],
    options?: { addDeco?: boolean; showCheckbox?: boolean }
): DropdownOption[] => {
    return statuses?.map(({ label, color, statusid }) => ({
        label,
        value:statusid,
        color,
        statusid,
        ...options,
    }));
};

export const mapAssigneeToDropdownOptions = (
  assignee:IAssignee[],
  options?: { addDeco?: boolean; showCheckbox?: boolean }
) => {
  return assignee?.map(({name,email,_id,isDeleted,role}) => ({
    label:name,
    role,
    value:email,
    isDeleted,
    id:_id,
    ...options
  }))
}

// export function capitalizeFirstLetterOfEachWord(name: string): string {
//   console.log("nameee",name);
//   return name.replace(/\b\w/g, (char) => char.toUpperCase());
// }

export function capitalizeFirstLetterOfEachWord(name: unknown): string {
  if (typeof name !== "string") {
    console.error("Invalid input for capitalizeFirstLetterOfEachWord:", name);
    return "-"; // Default fallback if name is not a string
  }

  return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

// export const getColumnValue = (row: Record<string, string | object>, col: string): string => {
//   const value = row[col];

//   if (typeof value === "object" && value !== null) {
//     return value[col] ?? "-"; // If object, return the value of its `col` property
//   }

//   return String(value ?? "-"); // Convert string/other values safely
// };

export const getColumnValue = (row: Record<string, unknown>, col: string): string => {
  const value = row[col];

  if (typeof value === "object" && value !== null) {
    if (col in value) {
      return String((value as Record<string, unknown>)[col] ?? "-");
    }
    return "-"; // Return "-" if the object doesn't contain the expected property
  }

  return String(value ?? "-");
};

export const getAssignedOwnerName = (row: Record<string, unknown>): string => {
  const owner = row['assignedOwner'];
  if (typeof owner === 'object' && owner !== null && 'name' in owner) {
    return String((owner as Record<string, unknown>).name ?? '-');
  }
  return '-';
};

export const getAssignedOwnerEmail = (row: Record<string, unknown>): string => {
  const owner = row['assignedOwner'];
  if (typeof owner === 'object' && owner !== null && 'email' in owner) {
    return String((owner as Record<string, unknown>).email ?? '-');
  }
  return '-';
};


export function convertToOptions(data: RegionOption[]): DropdownOption[] {
    return data.map(item => ({
        label: item.name,
        value: item._id
    }));
}

// Utility function to generate a unique ID
export const generateUniqueId = (): string => {
  // Using timestamp and random number to ensure uniqueness
  const timestamp = Date.now().toString(36); // Convert the current time in milliseconds to base-36 (a-z, 0-9)
  const randomValue = Math.random().toString(36).substring(2, 10); // Random string to add variability

  return `${timestamp}-${randomValue}`;
};















