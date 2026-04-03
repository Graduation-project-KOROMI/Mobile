import { useRouter } from "expo-router";
import { useEffect } from "react";

import { ROUTES } from "@/src/navigation/routes";

const PROCESSING_REDIRECT_DELAY_MS = 2600;

export function useProcessingRedirect(variant?: string) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(
        variant === "disease" ? ROUTES.resultDisease : ROUTES.resultHealthy,
      );
    }, PROCESSING_REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [router, variant]);
}
