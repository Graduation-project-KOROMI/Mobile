import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { diagnosisAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const dotCount = 28;
const minRingSize = 188;
const maxRingSize = 240;

export default function ProcessingRoute() {
  const router = useRouter();
  const { variant } = useLocalSearchParams<{ variant?: string }>();
  const { width, height } = useResponsiveScale();

  const rotation = useSharedValue(0);
  const ringSize = useMemo(() => {
    const responsiveSize = width * 0.58;
    return Math.max(minRingSize, Math.min(responsiveSize, maxRingSize));
  }, [width]);
  const ringRadius = ringSize * 0.44;
  const logoTop = Math.max(30, height * 0.045);
  const logoSize = Math.max(50, Math.min(width * 0.16, 68));
  const contentTopPadding = Math.max(logoTop + logoSize + 24, height * 0.24);
  const titleWidth = Math.min(width * 0.84, 330);
  const headingTopGap = Math.max(22, height * 0.03);
  const leafContainerSize = ringSize * 0.78;
  const leafImageWidth = leafContainerSize * (400 / 168);
  const leafImageHeight = leafContainerSize * (267 / 168);
  const leafImageLeft = -leafContainerSize * (116 / 168);
  const leafImageTop = -leafContainerSize * (50 / 168);

  const dotItems = useMemo(() => {
    const baseDotSize = Math.max(4.5, ringSize * 0.028);

    return Array.from({ length: dotCount }, (_, index) => {
      const angle = (2 * Math.PI * index) / dotCount - Math.PI / 2;
      const wave = (Math.sin(angle) + 1) / 2;
      const size = baseDotSize + wave * baseDotSize * 0.95;
      const opacity = 0.35 + wave * 0.55;

      return {
        index,
        size,
        opacity,
        left: ringSize / 2 + ringRadius * Math.cos(angle) - size / 2,
        top: ringSize / 2 + ringRadius * Math.sin(angle) - size / 2,
      };
    });
  }, [ringRadius, ringSize]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2500,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, [rotation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(variant === "disease" ? ROUTES.resultDisease : ROUTES.resultHealthy);
    }, 2600);

    return () => clearTimeout(timer);
  }, [router, variant]);

  const ringRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <AppScreenBackground
      backgroundUri={diagnosisAssets.processing.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: width * 1.2,
        height: height * 1.2,
        top: -28,
      }}
      backgroundOpacity={0.07}
      style={styles.screen}
    >
      <AppTopBar sx={(value) => value} sy={(value) => value} logoUri={diagnosisAssets.processing.logo} />

      <View
        style={[
          styles.content,
          {
            paddingTop: contentTopPadding,
            paddingBottom: Math.max(34, height * 0.06),
          },
        ]}
      >
        <View style={[styles.loadingArea, { width: ringSize, height: ringSize }]}>
          <Animated.View
            style={[
              styles.dotRing,
              ringRotateStyle,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
              },
            ]}
          >
            {dotItems.map((dot) => (
              <View
                key={dot.index}
                style={[
                  styles.dot,
                  {
                    left: dot.left,
                    top: dot.top,
                    width: dot.size,
                    height: dot.size,
                    borderRadius: dot.size / 2,
                    opacity: dot.opacity,
                  },
                ]}
              />
            ))}
          </Animated.View>

          <View
            style={[
              styles.leafMask,
              {
                width: leafContainerSize,
                height: leafContainerSize,
                borderRadius: leafContainerSize / 2,
              },
            ]}
          >
            <Image
              source={{ uri: diagnosisAssets.processing.leafGraphic }}
              style={[
                styles.leafImage,
                {
                  width: leafImageWidth,
                  height: leafImageHeight,
                  left: leafImageLeft,
                  top: leafImageTop,
                },
              ]}
              resizeMode="cover"
            />
          </View>
        </View>

        <Text
          style={[
            styles.title,
            {
              width: titleWidth,
              fontSize: Math.min(width * 0.07, 29),
              lineHeight: Math.min(width * 0.07, 29) * 1.35,
              marginTop: headingTopGap,
            },
          ]}
        >
          يتم الآن تحليل الصورة
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              width: titleWidth,
              fontSize: Math.max(13, Math.min(width * 0.038, 15)),
              lineHeight: Math.max(18, Math.min(width * 0.051, 22)),
              marginTop: 2,
            },
          ]}
        >
          نستخدم تقنيات الذكاء الاصطناعي لتحديد المرض بدقة
        </Text>
      </View>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  loadingArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  dotRing: {
    position: "absolute",
  },
  dot: {
    position: "absolute",
    backgroundColor: "#9CCA4D",
  },
  leafMask: {
    overflow: "hidden",
  },
  leafImage: {
    position: "absolute",
  },
  title: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: "Tajawal_700Bold",
    color: colors.primary,
    textAlign: "center",
    opacity: 0.95,
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
