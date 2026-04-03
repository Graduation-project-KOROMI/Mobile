import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import {
  HistoryCard,
  type PredictionHistoryEntry,
} from "@/src/components/cards/HistoryCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { mainAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const mockHistory: PredictionHistoryEntry[] = [
  {
    id: "history-1",
    dateLabel: "26 ابريل 2025 - 9:51 AM",
    statusLabel: "سليم",
    status: "healthy",
    imageUri: mainAssets.history.cardLeafOne,
  },
  {
    id: "history-2",
    dateLabel: "18 ابريل 2025 - 11:01 AM",
    statusLabel: "بياض دقيقي",
    status: "diseased",
    imageUri: mainAssets.history.cardLeafTwo,
  },
  {
    id: "history-3",
    dateLabel: "17 ابريل 2025 - 9:30 AM",
    statusLabel: "سليم",
    status: "healthy",
    imageUri: mainAssets.history.cardLeafThree,
  },
];

export default function HistoryRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground
      backgroundUri={mainAssets.history.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={mainAssets.history.logo}
        profileUri={mainAssets.history.profile}
        menuUri={mainAssets.history.menu}
      />

      {mockHistory.length > 0 ? (
        <>
          <Text
            style={[
              styles.screenTitle,
              {
                top: sy(161),
                right: sx(23),
                width: sx(346),
                fontSize: sx(36),
              },
            ]}
          >
            التشخيصات السابقة
          </Text>

          <View
            style={{
              position: "absolute",
              left: sx(37),
              top: sy(209),
              width: sx(320),
              height: sy(2),
              borderRadius: sx(16),
              backgroundColor: colors.primary,
            }}
          />

          <Image
            source={{ uri: mainAssets.history.iconSort }}
            style={{
              position: "absolute",
              left: sx(37),
              top: sy(219),
              width: sx(30),
              height: sy(30),
            }}
            resizeMode="contain"
          />

          <BackButton
            iconUri={mainAssets.history.back}
            sx={sx}
            sy={sy}
            top={219}
            right={36}
            fallbackRoute={ROUTES.home}
          />

          {mockHistory.map((entry, index) => (
            <HistoryCard
              key={entry.id}
              item={entry}
              top={290 + 141 * index}
              sx={sx}
              sy={sy}
              trashIconUri={mainAssets.history.iconTrash}
              shareIconUri={mainAssets.history.iconShare}
              onPress={() =>
                router.push(
                  entry.status === "healthy" ? ROUTES.resultHealthy : ROUTES.resultDisease,
                )
              }
            />
          ))}
        </>
      ) : (
        <View
          style={{
            position: "absolute",
            left: sx(-3),
            top: sy(264),
            width: sx(400),
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: mainAssets.history.empty }}
            style={{
              width: sx(400),
              height: sy(267),
            }}
            resizeMode="cover"
          />

          <View
            style={{
              marginTop: sy(12),
              width: sx(287),
              alignItems: "center",
            }}
          >
            <Text style={[styles.emptyTitle, { fontSize: sx(24), lineHeight: sy(29) }]}>
              لا توجد تشخيصات سابقة !
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                { marginTop: sy(2), fontSize: sx(14), lineHeight: sy(17) },
              ]}
            >
              ابدا تشخيصك الاول
            </Text>
          </View>
        </View>
      )}

      <AppBottomNav
        sx={sx}
        sy={sy}
        active="history"
        icons={{
          settings: mainAssets.history.navSettings,
          history: mainAssets.history.navHistory,
          home: mainAssets.history.navHome,
        }}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    position: "absolute",
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  emptySubtitle: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
    textDecorationLine: "underline",
  },
});
