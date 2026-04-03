import { getPredictionHistoryEntries } from "@/src/services/history/historyService";
import type { PredictionHistoryEntry } from "@/src/shared/types/history";

export function usePredictionHistory(): PredictionHistoryEntry[] {
  return getPredictionHistoryEntries();
}
