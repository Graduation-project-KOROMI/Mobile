import { assetUri } from "@/src/constants/assets/utils";

export const authAssets = {
  appIcon: assetUri(require("../../../assets/images/app_icon.png")),
  splashBg: assetUri(require("../../../assets/images/splash_bg.jpg")),
  splashLogo: assetUri(require("../../../assets/images/splash_logo.png")),
  login: {
    iconEmail: assetUri(
      require("../../../assets/images/figma/3f9eebf0-a9ca-4aaa-83e3-86dcc6bbb7ea.png"),
    ),
    iconLock: assetUri(
      require("../../../assets/images/figma/0e9e5dd2-a4dd-40de-9677-22f76d4c7474.png"),
    ),
  },
  register: {
    iconUser: assetUri(
      require("../../../assets/images/figma/4ec52afe-76ab-4dba-bb1b-75cea2d5007f.png"),
    ),
    iconEmail: assetUri(
      require("../../../assets/images/figma/99d0a567-166b-4c61-82fc-39f17dce6e5a.png"),
    ),
    iconLock: assetUri(
      require("../../../assets/images/figma/20a2cd8a-d542-41e2-9680-3d7237d5b684.png"),
    ),
  },
} as const;
