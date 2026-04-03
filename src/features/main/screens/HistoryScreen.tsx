import { useRouter } from "expo-router";

import { HistoryScreenView } from "@/src/features/main/components/HistoryScreenView";
import { usePredictionHistory } from "@/src/features/main/hooks/usePredictionHistory";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { ROUTES } from "@/src/navigation/routes";
import type { PredictionHistoryEntry } from "@/src/shared/types/history";

export function HistoryScreen() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const entries = usePredictionHistory();

  const handleOpenResult = (entry: PredictionHistoryEntry) => {
    router.push(entry.status === "healthy" ? ROUTES.resultHealthy : ROUTES.resultDisease);
  };

  return (
    <HistoryScreenView sx={sx} sy={sy} entries={entries} onOpenResult={handleOpenResult} />
  );
}
