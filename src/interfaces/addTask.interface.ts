export interface IAddTask {
  activity: string; // Assuming it's an ID
  description: string;
  startTime: string; // ISO 8601 format (e.g., "2025-03-15T11:00:00Z")
  endTime: string; // ISO 8601 format
  reminder: string; // Minutes before the event
  emailBy: boolean; // Whether to send an email reminder
  associated_lead: string; // Assuming it's an ID
}

  