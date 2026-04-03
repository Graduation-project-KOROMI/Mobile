import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { diagnosisAssets } from "@/src/constants/assets";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

type ErrorNoConnectionScreenProps = {
  onRetry: () => void | Promise<void>;
};

export function ErrorNoConnectionScreen({ onRetry }: ErrorNoConnectionScreenProps) {
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground
      backgroundUri={diagnosisAssets.errorNoConnection.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <SafeAreaView edges={["top", "bottom", "left", "right"]} style={styles.safeArea}>
        <View style={styles.content}>
          <AppTopBar sx={sx} sy={sy} logoUri={diagnosisAssets.errorNoConnection.logo} />

          <Image
            source={{ uri: diagnosisAssets.errorNoConnection.illustration }}
            style={{
              position: "absolute",
              left: sx(1),
              top: sy(182),
              width: sx(391),
              height: sy(391),
            }}
            resizeMode="cover"
          />

          <Text
            style={[
              styles.errorTitle,
              {
                top: sy(556),
                alignSelf: "center",
                width: sx(322),
                fontSize: sx(48),
                lineHeight: sy(58),
              },
            ]}
          >
            عذراً حدث خطأ!
          </Text>

          <Text
            style={[
              styles.errorSubtitle,
              {
                top: sy(614),
                alignSelf: "center",
                width: sx(304),
                fontSize: sx(16),
                lineHeight: sy(19),
              },
            ]}
          >
            تعذر الاتصال بالخادم{"\n"}تحقق من اتصالك بالانترنت وحاول مرة اخرى
          </Text>

          <PrimaryButton
            label="إعادة المحاولة"
            onPress={() => {
              void onRetry();
            }}
            style={{
              position: "absolute",
              left: sx(37),
              top: sy(686),
              width: sx(320),
              height: sy(58),
              borderRadius: sx(16),
            }}
            textStyle={{
              fontSize: sx(24),
              lineHeight: sy(29),
            }}
          />
        </View>
      </SafeAreaView>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  errorTitle: {
    position: "absolute",
    color: colors.danger,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  errorSubtitle: {
    position: "absolute",
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
