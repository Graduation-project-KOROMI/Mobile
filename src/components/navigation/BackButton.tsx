import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";

import type { AppRoute } from "@/src/constants/routes";

type ScaleFn = (value: number) => number;

type BackButtonProps = {
  iconUri: string;
  sx: ScaleFn;
  sy: ScaleFn;
  top: number;
  right: number;
  fallbackRoute: AppRoute;
  onPress?: () => void;
};

export function BackButton({
  iconUri,
  sx,
  sy,
  top,
  right,
  fallbackRoute,
  onPress,
}: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(fallbackRoute);
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={{
        position: "absolute",
        right: sx(right),
        top: sy(top),
        width: sx(30),
        height: sy(30),
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        elevation: 20,
      }}
    >
      <Image
        source={{ uri: iconUri }}
        style={{ width: sx(30), height: sy(30) }}
        resizeMode="contain"
      />
    </Pressable>
  );
}
