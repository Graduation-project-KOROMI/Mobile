import { useRouter } from "expo-router";

import { HomeScreenView } from "@/src/features/main/components/HomeScreenView";
import { useHomeSidebar } from "@/src/features/main/hooks/useHomeSidebar";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { ROUTES } from "@/src/navigation/routes";

export function HomeScreen() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const { isSidebarVisible, openSidebar, closeSidebar } = useHomeSidebar();

  return (
    <HomeScreenView
      sx={sx}
      sy={sy}
      isSidebarVisible={isSidebarVisible}
      onOpenSidebar={openSidebar}
      onCloseSidebar={closeSidebar}
      onCapturePress={() => router.push(ROUTES.imagePreview)}
      onUploadPress={() => router.push(ROUTES.imagePreview)}
    />
  );
}
