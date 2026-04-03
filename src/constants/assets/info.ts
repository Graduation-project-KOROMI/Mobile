import { assetUri } from "@/src/constants/assets/utils";

export const infoAssets = {
  aboutKoromi: {
    bg: assetUri(
      require("../../../assets/images/figma/16e8921e-58dc-429f-a7be-eea8b9d8f97e.jpg"),
    ),
    profile: assetUri(
      require("../../../assets/images/figma/208b3f2f-7ad8-456d-8de0-9705a9750c27.png"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/a3e23259-d7fd-4d63-b53c-05c71034413a.svg"),
    ),
    menu: assetUri(
      require("../../../assets/images/figma/menu.png"),
    ),
    navHome: assetUri(
      require("../../../assets/images/figma/937108ec-2d47-41d7-a98a-95045ef20a64.png"),
    ),
    navSettings: assetUri(
      require("../../../assets/images/figma/e35d5b3a-12ff-40fb-9f86-0621e0c1c03e.png"),
    ),
    navHistory: assetUri(
      require("../../../assets/images/figma/eeed1050-302c-47b2-9786-9442cea582ce.png"),
    ),
    illustration: assetUri(
      require("../../../assets/images/figma/about.png"),
    ),
    arrow: assetUri(
      require("../../../assets/images/figma/b2c12cbb-331b-494a-855a-953cef0d0244.png"),
    ),
  },
  team: {
    bg: assetUri(
      require("../../../assets/images/figma/5b3260ae-46f0-4f29-a0ce-887b214825f0.jpg"),
    ),
    profile: assetUri(
      require("../../../assets/images/figma/563cbcff-c649-414a-9bd7-e5610253b9a0.png"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/3191118f-da4f-4ca7-9481-94651a373260.svg"),
    ),
    menu: assetUri(
      require("../../../assets/images/figma/menu.png"),
    ),
    navHome: assetUri(
      require("../../../assets/images/figma/ac215897-4881-490b-9e12-6b944950076c.png"),
    ),
    navSettings: assetUri(
      require("../../../assets/images/figma/e5f4bfe3-bc01-451f-9d8d-84f360238ca3.png"),
    ),
    navHistory: assetUri(
      require("../../../assets/images/figma/59a2375c-d722-4494-bbc2-55740473492d.png"),
    ),
    illustration: assetUri(
      require("../../../assets/images/figma/our_team.png"),
    ),
    arrow: assetUri(
      require("../../../assets/images/figma/eea07d3f-8174-4763-a2ae-2734494c3443.png"),
    ),
    memberPhoto: assetUri(
      require("../../../assets/images/figma/6b53430a-6230-4e88-8ba7-cf4544c95483.png"),
    ),
    memberPlaceholder: assetUri(
      require("../../../assets/images/figma/76bd7fe5-ef75-4936-8f58-fae650a8fb0c.png"),
    ),
    iconWhatsapp: assetUri(
      require("../../../assets/images/figma/e9a47873-7067-4d31-9087-412f724db56b.png"),
    ),
    iconInstagram: assetUri(
      require("../../../assets/images/figma/3a5af649-30f0-470a-8b8a-1ec09d3be869.svg"),
    ),
    iconFacebook: assetUri(
      require("../../../assets/images/figma/d0b31fbe-c581-408f-b151-89917febfb3f.svg"),
    ),
  },
} as const;
