import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { SecondaryButton } from "@/src/components/controls/SecondaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

type UnexpectedErrorFallbackScreenProps = {
  onGoHome: () => void;
  onTryAgain: () => void;
};

export function UnexpectedErrorFallbackScreen({
  onGoHome,
  onTryAgain,
}: UnexpectedErrorFallbackScreenProps) {
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground backgroundColor={colors.surfaceBackground}>
      <SafeAreaView edges={["top", "bottom", "left", "right"]} style={styles.safeArea}>
        <View style={styles.container}>
          <View
            style={[
              styles.card,
              {
                width: sx(329),
                paddingHorizontal: sx(24),
                paddingVertical: sy(28),
                borderRadius: sx(24),
                gap: sy(18),
              },
            ]}
          >
            <Text style={[styles.eyebrow, { fontSize: sx(16), lineHeight: sy(20) }]}>
              Koromi
            </Text>

            <Text style={[styles.title, { fontSize: sx(28), lineHeight: sy(34) }]}>
              Sorry, Unexpected error crashed the App
            </Text>

            <Text style={[styles.subtitle, { fontSize: sx(15), lineHeight: sy(22) }]}>
              You can try to recover the current screen or go back to the home screen.
            </Text>

            <View style={[styles.actions, { gap: sy(12) }]}>
              <PrimaryButton
                label="Try again"
                onPress={onTryAgain}
                style={{
                  width: "100%",
                  height: sy(56),
                  borderRadius: sx(16),
                }}
                textStyle={{
                  fontSize: sx(20),
                  lineHeight: sy(24),
                }}
              />

              <SecondaryButton
                label="Go home"
                onPress={onGoHome}
                style={{
                  width: "100%",
                  height: sy(56),
                  borderRadius: sx(16),
                }}
                textStyle={{
                  fontSize: sx(20),
                  lineHeight: sy(24),
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: colors.cardBackground,
    shadowColor: colors.cardShadow,
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 12,
  },
  eyebrow: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    includeFontPadding: false,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    includeFontPadding: false,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: "Tajawal_400Regular",
    textAlign: "center",
    includeFontPadding: false,
  },
  actions: {
    width: "100%",
  },
});
