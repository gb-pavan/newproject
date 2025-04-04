export interface FormField {
  _id: string;
  name: string;
  type: string;
  options?: string[];
}

export interface RegionOption {
    _id: string;
    name: string;
  }

export interface FormSubmitPayload {
  name: string;
  phone: string;
  region?: string;
  fields: Record<string, string>; // Allows dynamic string keys with string values
}
