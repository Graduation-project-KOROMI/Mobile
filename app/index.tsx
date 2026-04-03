import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { authAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const splashDurationMs = 2200;

function LoadingDot({
  delayMs,
  size,
  liftDistance,
}: {
  delayMs: number;
  size: number;
  liftDistance: number;
}) {
  const opacity = useSharedValue(0.35);

  useEffect(() => {
    opacity.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: 420,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(0.35, {
            duration: 420,
            easing: Easing.in(Easing.quad),
          }),
        ),
        -1,
        false,
      ),
    );
  }, [delayMs, opacity]);

  const dotStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: (1 - opacity.value) * -liftDistance }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.loadingDot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        dotStyle,
      ]}
    />
  );
}

export default function IndexRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(ROUTES.login);
    }, splashDurationMs);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <AppScreenBackground
      backgroundUri={authAssets.splashBg}
      backgroundColor={colors.surfaceBackground}
      backgroundOpacity={0.2}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <Image
        source={{ uri: authAssets.splashLogo }}
        style={[
          styles.logo,
          {
            top: sy(157),
            width: sx(170),
            height: sy(170),
          },
        ]}
        resizeMode="contain"
      />

      <Text
        style={[
          styles.brand,
          {
            top: sy(327),
            width: sx(280),
            fontSize: sx(96),
            lineHeight: sy(96),
          },
        ]}
      >
        كرومي
      </Text>

      <Text
        style={[
          styles.tagline,
          {
            top: sy(574),
            width: sx(336),
            fontSize: sx(20),
            lineHeight: sy(30),
          },
        ]}
      >
        تشخيص فوري واطمئنان دائم لكرومك
      </Text>

      <View
        style={[
          styles.loadingDotsRow,
          {
            top: sy(740),
            gap: sx(10),
          },
        ]}
      >
        <LoadingDot delayMs={0} size={sx(9)} liftDistance={sy(5)} />
        <LoadingDot delayMs={180} size={sx(9)} liftDistance={sy(5)} />
        <LoadingDot delayMs={360} size={sx(9)} liftDistance={sy(5)} />
      </View>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    alignSelf: "center",
  },
  brand: {
    position: "absolute",
    alignSelf: "center",
    color: "#6FAC32",
    fontFamily: "Tajawal_400Regular",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  tagline: {
    position: "absolute",
    alignSelf: "center",
    color: "#000000",
    fontFamily: "Tajawal_400Regular",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  loadingDotsRow: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  loadingDot: {
    backgroundColor: "#6FAC32",
  },
});
