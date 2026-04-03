import { useRouter } from "expo-router";

import { AboutKoromiScreenView } from "@/src/features/info/components/AboutKoromiScreenView";
import { aboutFaqItems } from "@/src/features/info/data/aboutFaqItems";
import { useFaqAccordion } from "@/src/features/info/hooks/useFaqAccordion";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { ROUTES } from "@/src/navigation/routes";

export function AboutKoromiScreen() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const accordion = useFaqAccordion(sy);

  return (
    <AboutKoromiScreenView
      sx={sx}
      sy={sy}
      accordion={accordion}
      faqItems={aboutFaqItems}
      onTeamPress={() => router.push(ROUTES.team)}
    />
  );
}
