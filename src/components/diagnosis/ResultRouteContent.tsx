import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";

import { ResultSummaryCard } from "@/src/components/cards/ResultSummaryCard";
import { SecondaryButton } from "@/src/components/controls/SecondaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { diagnosisAssets } from "@/src/constants/assets";
import {
    diseaseDescription,
    diseaseName,
    healthyDescription,
} from "@/src/features/diagnosis/data/diagnosisCopy";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { ROUTES, type ResultVariant } from "@/src/navigation/routes";
import { colors } from "@/src/theme/colors";

type ResultRouteContentProps = {
  variant: ResultVariant;
};

export function ResultRouteContent({ variant }: ResultRouteContentProps) {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const isDisease = variant === "disease";

  return (
    <AppScreenBackground
      backgroundUri={diagnosisAssets.result.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={diagnosisAssets.result.logo}
        profileUri={diagnosisAssets.result.profile}
        menuUri={diagnosisAssets.result.menu}
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={128}
        width={345}
        height={isDisease ? 631 : 600}
        borderRadius={42}
        backgroundColor={colors.screenBackground}
        style={{ alignItems: "center" }}
      >
        <Pressable
          style={[
            styles.shareButton,
            {
              left: sx(33),
              top: sy(17),
              width: sx(30),
              height: sy(30),
            },
          ]}
        >
          <Image
            source={{
              uri: isDisease
                ? diagnosisAssets.result.shareDisease
                : diagnosisAssets.result.shareHealthy,
            }}
            style={{ width: sx(30), height: sy(30) }}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={[styles.cardTitle, { marginTop: sy(20), fontSize: sx(20) }]}>النتيجة!</Text>

        <Image
          source={{
            uri: isDisease
              ? diagnosisAssets.result.resultDisease
              : diagnosisAssets.result.resultHealthy,
          }}
          style={{
            marginTop: sy(37),
            width: sx(200),
            height: sy(200),
          }}
          resizeMode="contain"
        />

        <Text
          style={[
            styles.resultHeadline,
            {
              marginTop: sy(2),
              width: sx(280),
              fontSize: sx(40),
              color: isDisease ? colors.warning : colors.primary,
            },
          ]}
        >
          {isDisease ? "الورقة مصابة!" : "الورقة سليمة"}
        </Text>

        <ResultSummaryCard
          sx={sx}
          sy={sy}
          top={isDisease ? 328 : 349}
          thumbnailUri={
            isDisease
              ? diagnosisAssets.result.thumbDisease
              : diagnosisAssets.result.thumbHealthy
          }
          title={isDisease ? diseaseName : undefined}
          description={isDisease ? diseaseDescription : healthyDescription}
          accentColor={isDisease ? colors.warning : colors.textPrimary}
          onPress={isDisease ? () => router.push(ROUTES.diseaseDetails) : undefined}
        />

        {isDisease ? (
          <SecondaryButton
            label="طرق العلاج"
            onPress={() => router.push(ROUTES.treatment)}
            borderColor={colors.warning}
            style={{
              position: "absolute",
              top: sy(479),
              width: sx(320),
              height: sy(58),
              borderRadius: sx(16),
            }}
            textStyle={{ fontSize: sx(24) }}
          />
        ) : null}

        <SecondaryButton
          label="فحص ورقة جديدة"
          onPress={() => router.replace(ROUTES.imagePreview)}
          style={{
            position: "absolute",
            top: sy(isDisease ? 547 : 513),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          textStyle={{ fontSize: sx(24) }}
        />
      </ContentCard>

      <AppBottomNav
        sx={sx}
        sy={sy}
        active={null}
        icons={{
          settings: diagnosisAssets.result.navSettings,
          history: diagnosisAssets.result.navHistory,
          home: diagnosisAssets.result.navHome,
        }}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  resultHeadline: {
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
