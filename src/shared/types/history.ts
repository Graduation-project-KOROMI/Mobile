export type HistoryStatus = "healthy" | "diseased";

export type PredictionHistoryEntry = {
  id: string;
  dateLabel: string;
  statusLabel: string;
  status: HistoryStatus;
  imageUri: string;
};
