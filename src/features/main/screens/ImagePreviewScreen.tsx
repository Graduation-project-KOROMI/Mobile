import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";

import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { SecondaryButton } from "@/src/components/controls/SecondaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { mainAssets } from "@/src/constants/assets";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { ROUTES } from "@/src/navigation/routes";
import { colors } from "@/src/theme/colors";

export function ImagePreviewScreen() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground
      backgroundUri={mainAssets.imagePreview.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={mainAssets.imagePreview.logo}
        profileUri={mainAssets.imagePreview.profile}
        menuUri={mainAssets.imagePreview.menu}
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={128}
        width={345}
        height={646}
        borderRadius={42}
        style={{
          alignItems: "center",
          paddingTop: sy(20),
        }}
      >
        <Text style={[styles.cardTitle, { fontSize: sx(20), lineHeight: sy(24) }]}>
          معاينة الصورة
        </Text>

        <Image
          source={{ uri: mainAssets.imagePreview.preview }}
          style={{
            alignSelf: "center",
            marginTop: sy(13),
            width: sx(320),
            height: sy(320),
            borderRadius: sx(16),
          }}
          resizeMode="cover"
        />

        <Text style={[styles.hintText, { marginTop: sy(27), fontSize: sx(12) }]}>
          تاكد من وضوح الصورة قبل التحليل
        </Text>

        <PrimaryButton
          label="تحليل الصورة"
          onPress={() => router.push(ROUTES.processing)}
          style={{
            width: sx(320),
            height: sy(58),
            marginTop: sy(27),
            borderRadius: sx(16),
          }}
          textStyle={{ fontSize: sx(24) }}
        />

        <SecondaryButton
          label="اعادة الالتقاط"
          onPress={() => router.back()}
          style={{
            width: sx(320),
            height: sy(58),
            marginTop: sy(22),
            borderRadius: sx(16),
          }}
          textStyle={{ fontSize: sx(24) }}
        />
      </ContentCard>

      <Pressable
        onPress={() => router.replace(ROUTES.home)}
        style={[
          styles.homeLink,
          {
            top: sy(801),
          },
        ]}
      >
        <Text style={[styles.homeLinkText, { fontSize: sx(20) }]}>الرئيسية</Text>
        <Image
          source={{ uri: mainAssets.imagePreview.arrowRight }}
          style={{ width: sx(30), height: sy(30) }}
          resizeMode="contain"
        />
      </Pressable>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  hintText: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textMuted,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  homeLink: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  homeLinkText: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
