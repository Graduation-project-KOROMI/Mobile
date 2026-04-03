// Splash Screen implementation using Expo + React Native + Reanimated.
// Displays branded UI with animated loading indicator,
// applies responsive scaling based on design dimensions,
// and automatically navigates to the login screen after a fixed duration.

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

// Base design dimensions (used for responsive scaling)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

// Duration before navigating away from splash screen (ms)
const SPLASH_DURATION_MS = 2200;

// Props for animated loading dot
type LoadingDotProps = {
    delayMs: number;        // delay before animation starts
    size: number;           // dot size
    liftDistance: number;   // vertical movement distance
};

// Animated loading dot component (opacity + vertical motion loop)
function LoadingDot({ delayMs, size, liftDistance }: LoadingDotProps) {
    // Shared animated value controlling opacity
    const opacity = useSharedValue(0.35);

    useEffect(() => {
        // Start looping animation with delay (creates wave effect across dots)
        opacity.value = withDelay(
            delayMs,
            withRepeat(
                withSequence(
                    // Fade in
                    withTiming(1, {
                        duration: 420,
                        easing: Easing.out(Easing.quad),
                    }),
                    // Fade out
                    withTiming(0.35, {
                        duration: 420,
                        easing: Easing.in(Easing.quad),
                    }),
                ),
                -1, // infinite repeat
                false,
            ),
        );
    }, [delayMs, opacity]);

    // Animated style (opacity + vertical translation)
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

    // Get current screen dimensions
    const { width, height } = useWindowDimensions();

    // Load custom Arabic font
    const [fontsLoaded] = useFonts({ Tajawal_400Regular });

    // Responsive scaling utilities based on design reference dimensions.
    // sx: scales values horizontally (width-based)
    // sy: scales values vertically (height-based)
    // Ensures UI elements adapt proportionally across different screen sizes.
    const { sx, sy } = useMemo(() => {
        const scaleX = width / BASE_WIDTH;
        const scaleY = height / BASE_HEIGHT;

        return {
            sx: (value: number) => value * scaleX,
            sy: (value: number) => value * scaleY,
        };
    }, [height, width]);

    useEffect(() => {
        // Navigate to login screen after splash duration
        const timeout = setTimeout(() => {
            router.replace("./login"); // replace prevents going back to splash
        }, SPLASH_DURATION_MS);

        return () => clearTimeout(timeout);
    }, [router]);

    // Prevent rendering until font is loaded
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.safeArea}>
            <StatusBar style="dark" />

            <View style={styles.screen}>
                {/* Base background color */}
                <View style={styles.backgroundBase} />

                {/* Background pattern image */}
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

                {/* App logo */}
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

                {/* App name */}
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

                {/* Tagline / description */}
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

                {/* Animated loading indicator (3 staggered dots) */}
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

// Styles definition
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