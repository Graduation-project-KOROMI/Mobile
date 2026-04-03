import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";

type SettingsFieldRowProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function SettingsFieldRow({ children, style }: SettingsFieldRowProps) {
  return <View style={[{ flexDirection: "row", gap: 10 }, style]}>{children}</View>;
}
