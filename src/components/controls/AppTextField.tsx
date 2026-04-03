import type { ImageStyle, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { Image, StyleSheet, TextInput, View } from "react-native";

import { colors } from "@/src/theme/colors";

export type AppTextFieldProps = TextInputProps & {
  iconUri?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconStyle?: ImageStyle;
  textAlign?: "center" | "right";
};

export function AppTextField({
  iconUri,
  containerStyle,
  inputStyle,
  iconStyle,
  textAlign = "right",
  ...props
}: AppTextFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            textAlign,
          },
          inputStyle,
        ]}
      />
      {iconUri ? (
        <Image
          source={{ uri: iconUri }}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    writingDirection: "rtl",
  },
  icon: {
    position: "absolute",
    right: 20,
    width: 25,
    height: 25,
    opacity: 0.8,
  },
});
