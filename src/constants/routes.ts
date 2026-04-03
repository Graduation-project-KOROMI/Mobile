export const ROUTES = {
  splash: "/",
  login: "/login",
  register: "/register",
  home: "/home",
  history: "/history",
  settings: "/settings",
  aboutKoromi: "/about-koromi",
  team: "/team",
  imagePreview: "/image-preview",
  processing: "/processing",
  resultHealthy: "/result-healthy",
  resultDisease: "/result-disease",
  diseaseDetails: "/disease-details",
  treatment: "/treatment",
  errorNoConnection: "/error-no-connection",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

export type BottomNavKey = "settings" | "history" | "home";
export type SidebarItemKey = "home" | "history" | "settings" | "about";
export type ResultVariant = "healthy" | "disease";

export const sidebarDestinations: Record<SidebarItemKey, AppRoute> = {
  home: ROUTES.home,
  history: ROUTES.history,
  settings: ROUTES.settings,
  about: ROUTES.aboutKoromi,
};

export const bottomNavDestinations: Record<BottomNavKey, AppRoute> = {
  settings: ROUTES.settings,
  history: ROUTES.history,
  home: ROUTES.home,
};
