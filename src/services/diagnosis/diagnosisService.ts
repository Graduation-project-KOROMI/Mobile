import { apiClient } from "@/src/services/api/apiClient";

export type DiagnosisVariant = "healthy" | "disease";

export type AnalyzeLeafImagePayload = {
  imageUri: string;
};

export async function analyzeLeafImage(
  payload: AnalyzeLeafImagePayload,
): Promise<DiagnosisVariant> {
  // TODO: replace this stub with a real endpoint once backend contracts are finalized.
  void apiClient;
  void payload;
  return "healthy";
}
