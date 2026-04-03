import { Image, Pressable, StyleSheet, Text } from "react-native";

import type { ScaleFn } from "@/src/shared/types/scale";
import { colors } from "@/src/theme/colors";


type HomeActionCardProps = {
  title: string;
  iconUri: string;
  top: number;
  sx: ScaleFn;
  sy: ScaleFn;
  onPress: () => void;
};

export function HomeActionCard({ title, iconUri, top, sx, sy, onPress }: HomeActionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          top: sy(top),
          left: sx(25),
          width: sx(345),
          height: sy(126),
          borderRadius: sx(16),
          shadowRadius: sx(18),
          elevation: Math.max(3, Math.round(sx(6))),
          paddingHorizontal: sx(20),
        },
      ]}
    >
      <Image
        source={{ uri: iconUri }}
        style={{ width: sx(90), height: sy(90) }}
        resizeMode="contain"
      />

      <Text
        style={[
          styles.text,
          {
            fontSize: sx(36),
            width: sx(202),
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
