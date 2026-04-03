import { useLocalSearchParams } from "expo-router";

import { ProcessingScreenView } from "@/src/features/diagnosis/components/ProcessingScreenView";
import { useProcessingAnimation } from "@/src/features/diagnosis/hooks/useProcessingAnimation";
import { useProcessingRedirect } from "@/src/features/diagnosis/hooks/useProcessingRedirect";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";

export function ProcessingScreen() {
  const { variant } = useLocalSearchParams<{ variant?: string }>();
  const { width, height } = useResponsiveScale();

  useProcessingRedirect(variant);
  const animation = useProcessingAnimation(width, height);

  return <ProcessingScreenView width={width} height={height} animation={animation} />;
}
