import { assetUri } from "@/src/constants/assets/utils";

export const sharedAssets = {
  sidebar: {
    profile: assetUri(
      require("../../../assets/images/figma/35b2789d-b784-4c85-be5d-8eacf7045c44.png"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/4fe140e4-2d1d-4c48-ba66-77768f6e2cd9.svg"),
    ),
    menu: assetUri(
      require("../../../assets/images/figma/6588c2de-a586-4fbd-8d04-cc7c81ce35da.svg"),
    ),
    home: assetUri(
      require("../../../assets/images/figma/21123db9-bb65-47a0-ba16-0b298f05fd74.png"),
    ),
    settings: assetUri(
      require("../../../assets/images/figma/d206ec12-1eef-4113-b2a6-71e2bfb1235e.png"),
    ),
    history: assetUri(
      require("../../../assets/images/figma/7c3b24d3-f9de-4905-9f5d-1d168c624ec8.png"),
    ),
    about: assetUri(
      require("../../../assets/images/figma/231f6365-5ee1-47f0-a06e-b27c43ccaa3e.png"),
    ),
  },
} as const;
