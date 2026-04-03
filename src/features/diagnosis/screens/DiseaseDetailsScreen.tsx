import { StyleSheet, Text } from "react-native";

import { InfoSectionCard } from "@/src/components/cards/InfoSectionCard";
import { ResultSummaryCard } from "@/src/components/cards/ResultSummaryCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { diagnosisAssets } from "@/src/constants/assets";
import {
    diseaseCauses,
    diseaseDescription,
    diseaseSymptoms,
} from "@/src/features/diagnosis/data/diagnosisCopy";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { ROUTES } from "@/src/navigation/routes";
import { colors } from "@/src/theme/colors";

export function DiseaseDetailsScreen() {
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground
      backgroundUri={diagnosisAssets.details.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={diagnosisAssets.details.logo}
        profileUri={diagnosisAssets.details.profile}
        menuUri={diagnosisAssets.details.menu}
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={128}
        width={345}
        height={631}
        borderRadius={42}
        backgroundColor={colors.screenBackground}
        style={{ alignItems: "center" }}
      >
        <BackButton
          iconUri={diagnosisAssets.details.back}
          sx={sx}
          sy={sy}
          top={20}
          right={38}
          fallbackRoute={ROUTES.resultDisease}
        />

        <Text style={[styles.screenTitle, { marginTop: sy(20), fontSize: sx(20) }]}>وصف المرض</Text>

        <ResultSummaryCard
          sx={sx}
          sy={sy}
          top={109}
          thumbnailUri={diagnosisAssets.details.diseaseThumb}
          title="بياض دقيقي"
          description={diseaseDescription}
          accentColor={colors.warning}
        />

        <InfoSectionCard title="الاعراض" bullets={diseaseSymptoms} top={253} sx={sx} sy={sy} />
        <InfoSectionCard title="اسباب الاصابة" bullets={diseaseCauses} top={397} sx={sx} sy={sy} />
      </ContentCard>

      <AppBottomNav
        sx={sx}
        sy={sy}
        active={null}
        icons={{
          settings: diagnosisAssets.details.navSettings,
          history: diagnosisAssets.details.navHistory,
          home: diagnosisAssets.details.navHome,
        }}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
