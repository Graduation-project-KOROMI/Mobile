import { sharedAssets } from "@/src/constants/assets";

import type { BottomNavKey, SidebarItemKey } from "@/src/navigation/routes";

export type SidebarMenuItem = {
  key: SidebarItemKey;
  label: string;
  iconUri: string;
};

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    key: "home",
    label: "الرئيسية",
    iconUri: sharedAssets.sidebar.home,
  },
  {
    key: "history",
    label: "السجل",
    iconUri: sharedAssets.sidebar.history,
  },
  {
    key: "settings",
    label: "الاعدادات",
    iconUri: sharedAssets.sidebar.settings,
  },
  {
    key: "about",
    label: "عن كرومي",
    iconUri: sharedAssets.sidebar.about,
  },
];

export type BottomNavItem = {
  key: BottomNavKey;
  label: string;
};

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  {
    key: "settings",
    label: "الاعدادات",
  },
  {
    key: "history",
    label: "السجل",
  },
  {
    key: "home",
    label: "الرئيسية",
  },
];
