import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { colors } from "@/src/theme/colors";

type ScaleFn = (value: number) => number;

export type ContentCardProps = {
  children: ReactNode;
  sx: ScaleFn;
  sy: ScaleFn;
  top: number;
  width: number;
  height: number;
  borderRadius?: number;
  left?: number;
  right?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function ContentCard({
  children,
  sx,
  sy,
  top,
  width,
  height,
  borderRadius = 42,
  left = 24,
  right,
  backgroundColor = colors.cardBackground,
  style,
}: ContentCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          top: sy(top),
          width: sx(width),
          height: sy(height),
          borderRadius: sx(borderRadius),
          left: right === undefined ? sx(left) : undefined,
          right: right === undefined ? undefined : sx(right),
          backgroundColor,
          shadowRadius: sx(18),
          elevation: Math.max(3, Math.round(sx(6))),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
  },
});
