export const TIME_RANGE = [
    "All",
    "Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Last Week",
    "Last Month",
    "Custom Date"
] as const;

export type TimeRangeType = (typeof TIME_RANGE)[number]; 