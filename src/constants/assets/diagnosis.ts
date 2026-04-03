import { assetUri } from "@/src/constants/assets/utils";

export const diagnosisAssets = {
  processing: {
    bg: assetUri(
      require("../../../assets/images/figma/33696956-a607-4963-bed0-e964bfce32d1.jpg"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/5f2d94e8-0a14-414b-9da3-982934c605e0.svg"),
    ),
    leafGraphic: assetUri(require("../../../assets/images/leaf.png")),
  },
  result: {
    bg: assetUri(
      require("../../../assets/images/figma/b2f92d51-be6e-4797-b486-4588cf553e22.jpg"),
    ),
    profile: assetUri(
      require("../../../assets/images/figma/38594b9f-5dd3-4605-be94-dc92510bb8bf.png"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/c07048b0-e3fe-4e03-b19a-0349864a680f.svg"),
    ),
    menu: assetUri(
      require("../../../assets/images/figma/menu.png"),
    ),
    shareHealthy: assetUri(
      require("../../../assets/images/figma/4797b4ea-dc7e-4868-b974-602af1ef3b4a.png"),
    ),
    shareDisease: assetUri(
      require("../../../assets/images/figma/d14edeae-e5e8-47f2-b319-6aed413c71ab.png"),
    ),
    navHome: assetUri(
      require("../../../assets/images/figma/309d548d-2c7e-4d4e-8a2f-9d1868e37611.png"),
    ),
    navSettings: assetUri(
      require("../../../assets/images/figma/e07db468-3ad9-438b-a99e-dbbfa6e575a3.png"),
    ),
    navHistory: assetUri(
      require("../../../assets/images/figma/b55c6833-9597-4187-afeb-c09dd65e2e77.png"),
    ),
    resultHealthy: assetUri(
      require("../../../assets/images/figma/981906dd-86f0-4b61-a401-cb7d107a5bf2.png"),
    ),
    resultDisease: assetUri(
      require("../../../assets/images/figma/d480b6cb-3464-4263-9afe-c40052a7cd0d.png"),
    ),
    thumbHealthy: assetUri(
      require("../../../assets/images/figma/e81a5c4f-39c6-44ff-bf69-8f9aaef7ef90.jpg"),
    ),
    thumbDisease: assetUri(
      require("../../../assets/images/figma/32579651-a839-4d22-8767-39ce77d89654.jpg"),
    ),
  },
  details: {
    bg: assetUri(
      require("../../../assets/images/figma/77742ce8-82d1-4531-b9a5-6ddb8a9c4278.jpg"),
    ),
    profile: assetUri(
      require("../../../assets/images/figma/0cb99206-2e72-4433-8f85-3cf1a724e70d.png"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/0f094f9f-d1a6-4627-9cce-e429c33ac791.svg"),
    ),
    menu: assetUri(
      require("../../../assets/images/figma/menu.png"),
    ),
    back: assetUri(
      require("../../../assets/images/figma/fa04cb68-da31-4c14-91ee-dcf18f45061e.png"),
    ),
    navHome: assetUri(
      require("../../../assets/images/figma/55c241ed-b419-4b90-bcbc-dd06d898dea4.png"),
    ),
    navSettings: assetUri(
      require("../../../assets/images/figma/e83dbc5c-7b47-486d-9eed-8ea403ff13ef.png"),
    ),
    navHistory: assetUri(
      require("../../../assets/images/figma/7ce9dcd7-6613-4290-9b10-f0be781253f7.png"),
    ),
    diseaseThumb: assetUri(
      require("../../../assets/images/figma/08fe1d3f-28d8-42bc-9184-5f73ea126595.jpg"),
    ),
  },
  treatment: {
    bg: assetUri(
      require("../../../assets/images/figma/74e94b68-78e4-4ebc-9c1b-967ece3ec9ea.jpg"),
    ),
    profile: assetUri(
      require("../../../assets/images/figma/06a50310-d886-4073-9fa8-647a76f80428.png"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/07a83105-fabd-4cce-911b-839bb58cac86.svg"),
    ),
    menu: assetUri(
      require("../../../assets/images/figma/menu.png"),
    ),
    back: assetUri(
      require("../../../assets/images/figma/94fc2a7a-fa00-4dd3-a879-9872b544a14c.png"),
    ),
    navHome: assetUri(
      require("../../../assets/images/figma/ed71576d-c400-4a20-9f1d-86654c02b7a4.png"),
    ),
    navSettings: assetUri(
      require("../../../assets/images/figma/64a0a361-2d29-446a-91fd-87694e62e4e8.png"),
    ),
    navHistory: assetUri(
      require("../../../assets/images/figma/988c0a0e-8aec-4ff4-8209-a44bafbe10db.png"),
    ),
  },
  errorNoConnection: {
    bg: assetUri(
      require("../../../assets/images/figma/bdd679c0-8893-43b9-bcac-c22b021a35e7.jpg"),
    ),
    logo: assetUri(
      require("../../../assets/images/figma/cf7f30ce-fa59-408b-977c-ed3f3f1713c7.svg"),
    ),
    illustration: assetUri(
      require("../../../assets/images/figma/392b1a0d-6a49-4f52-b765-e24271d202d0.png"),
    ),
  },
} as const;
