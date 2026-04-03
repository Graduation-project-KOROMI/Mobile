import type { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/src/theme/colors";

type PrimaryButtonProps = PressableProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function PrimaryButton({ label, style, textStyle, ...props }: PrimaryButtonProps) {
  return (
    <Pressable {...props} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
