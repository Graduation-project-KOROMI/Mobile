import { Image } from "react-native";

export const assetUri = (asset: number) => Image.resolveAssetSource(asset).uri;
