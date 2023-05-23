export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft,
}
export enum TaskPriorities {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10,
} as const
