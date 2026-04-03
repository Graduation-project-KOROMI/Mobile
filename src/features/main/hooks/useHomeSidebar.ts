import { useState } from "react";

export function useHomeSidebar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return {
    isSidebarVisible,
    openSidebar: () => setIsSidebarVisible(true),
    closeSidebar: () => setIsSidebarVisible(false),
  };
}

export type HomeSidebarController = ReturnType<typeof useHomeSidebar>;
