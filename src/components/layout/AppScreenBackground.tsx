import type { ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import type { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { Image, StyleSheet, View } from "react-native";

import { colors } from "@/src/theme/colors";

type AppScreenBackgroundProps = {
  children: ReactNode;
  backgroundUri?: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundStyle?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
};

export function AppScreenBackground({
  children,
  backgroundUri,
  backgroundColor = colors.surfaceBackground,
  backgroundOpacity = 0.08,
  backgroundStyle,
  style,
}: AppScreenBackgroundProps) {
  return (
    <View style={[styles.screen, { backgroundColor }, style]}>
      <StatusBar style="dark" />
      {backgroundUri ? (
        <Image
          source={{ uri: backgroundUri }}
          style={[styles.backgroundPattern, { opacity: backgroundOpacity }, backgroundStyle]}
          resizeMode="cover"
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
  },
});
