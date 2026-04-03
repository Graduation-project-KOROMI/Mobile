import { useRouter } from "expo-router";

import { ROUTES } from "@/src/navigation/routes";
import { ErrorNoConnectionScreen } from "@/src/screens/ErrorNoConnectionScreen";

export function ErrorNoConnectionRouteScreen() {
  const router = useRouter();

  const handleRetry = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(ROUTES.home);
  };

  return <ErrorNoConnectionScreen onRetry={handleRetry} />;
}
