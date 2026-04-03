import { Image, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { diagnosisAssets } from "@/src/constants/assets";
import type { ProcessingAnimationState } from "@/src/features/diagnosis/hooks/useProcessingAnimation";
import { colors } from "@/src/theme/colors";

type ProcessingScreenViewProps = {
  width: number;
  height: number;
  animation: ProcessingAnimationState;
};

export function ProcessingScreenView({ width, height, animation }: ProcessingScreenViewProps) {
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
            paddingTop: animation.contentTopPadding,
            paddingBottom: Math.max(34, height * 0.06),
          },
        ]}
      >
        <View style={[styles.loadingArea, { width: animation.ringSize, height: animation.ringSize }]}>
          <Animated.View
            style={[
              styles.dotRing,
              animation.ringRotateStyle,
              {
                width: animation.ringSize,
                height: animation.ringSize,
                borderRadius: animation.ringSize / 2,
              },
            ]}
          >
            {animation.dotItems.map((dot) => (
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
                width: animation.leafContainerSize,
                height: animation.leafContainerSize,
                borderRadius: animation.leafContainerSize / 2,
              },
            ]}
          >
            <Image
              source={{ uri: diagnosisAssets.processing.leafGraphic }}
              style={[
                styles.leafImage,
                {
                  width: animation.leafImageWidth,
                  height: animation.leafImageHeight,
                  left: animation.leafImageLeft,
                  top: animation.leafImageTop,
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
              width: animation.titleWidth,
              fontSize: Math.min(width * 0.07, 29),
              lineHeight: Math.min(width * 0.07, 29) * 1.35,
              marginTop: animation.headingTopGap,
            },
          ]}
        >
          يتم الآن تحليل الصورة
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              width: animation.titleWidth,
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
