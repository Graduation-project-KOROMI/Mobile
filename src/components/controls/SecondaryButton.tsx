import type { PressableProps, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "@/src/theme/colors";

type SecondaryButtonProps = PressableProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderColor?: string;
};

export function SecondaryButton({
  label,
  style,
  textStyle,
  borderColor = colors.primary,
  ...props
}: SecondaryButtonProps) {
  return (
    <Pressable {...props} style={[styles.button, { borderColor }, style]}>
      <Text style={[styles.text, { color: borderColor }, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
