import { mainAssets } from "@/src/constants/assets";
import type { PredictionHistoryEntry } from "@/src/shared/types/history";

const mockHistoryEntries: PredictionHistoryEntry[] = [
  {
    id: "history-1",
    dateLabel: "26 ابريل 2025 - 9:51 AM",
    statusLabel: "سليم",
    status: "healthy",
    imageUri: mainAssets.history.cardLeafOne,
  },
  {
    id: "history-2",
    dateLabel: "18 ابريل 2025 - 11:01 AM",
    statusLabel: "بياض دقيقي",
    status: "diseased",
    imageUri: mainAssets.history.cardLeafTwo,
  },
  {
    id: "history-3",
    dateLabel: "17 ابريل 2025 - 9:30 AM",
    statusLabel: "سليم",
    status: "healthy",
    imageUri: mainAssets.history.cardLeafThree,
  },
];

export function getPredictionHistoryEntries(): PredictionHistoryEntry[] {
  return mockHistoryEntries;
}
