import { Tajawal_400Regular, useFonts } from "@expo-google-fonts/tajawal";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo } from "react";
import {
    Image,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;
const SPLASH_DURATION_MS = 2200;

type LoadingDotProps = {
  delayMs: number;
  size: number;
  liftDistance: number;
};

function LoadingDot({ delayMs, size, liftDistance }: LoadingDotProps) {
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

export default function SplashScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [fontsLoaded] = useFonts({ Tajawal_400Regular });

  const { sx, sy } = useMemo(() => {
    const scaleX = width / BASE_WIDTH;
    const scaleY = height / BASE_HEIGHT;

    return {
      sx: (value: number) => value * scaleX,
      sy: (value: number) => value * scaleY,
    };
  }, [height, width]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("./login");
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [router]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <View style={styles.backgroundBase} />
        <Image
          source={require("../../assets/images/splash_bg.jpg")}
          style={[
            styles.backgroundPattern,
            {
              width: sx(BASE_WIDTH),
              height: sy(BASE_HEIGHT),
            },
          ]}
          resizeMode="cover"
        />

        <Image
          source={require("../../assets/images/splash_logo.png")}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E9F8E5",
  },
  screen: {
    flex: 1,
    backgroundColor: "#E9F8E5",
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E9F8E5",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    opacity: 0.2,
  },
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
