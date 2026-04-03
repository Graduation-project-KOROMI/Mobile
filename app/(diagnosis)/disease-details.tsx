import { StyleSheet, Text } from "react-native";

import { InfoSectionCard } from "@/src/components/cards/InfoSectionCard";
import { ResultSummaryCard } from "@/src/components/cards/ResultSummaryCard";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { diagnosisAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const diseaseDescription =
  "مرض فطري يصيب أوراق العنب، يظهر على شكل طبقة بيضاء تشبه المسحوق، ويؤثر على نمو النبات وجودة المحصول إذا لم يتم علاجه.";

const symptoms = [
  "ظهور طبقة بيضاء تشبه البودرة على سطح الأوراق",
  "اصفرار الأوراق والتفافها مع ضعف نموها",
  "جفاف وتساقط الأوراق في الحالات المتقدمة",
];

const causes = [
  "ارتفاع الرطوبة وضعف التهوية بين أوراق العنب",
  "درجات حرارة معتدلة تساعد على نمو الفطر",
  "إهمال العناية بالنبات وعدم إزالة الأجزاء المصابة",
];

export default function DiseaseDetailsRoute() {
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

        <Text style={[styles.screenTitle, { marginTop: sy(20), fontSize: sx(20) }]}>
          وصف المرض
        </Text>

        <ResultSummaryCard
          sx={sx}
          sy={sy}
          top={109}
          thumbnailUri={diagnosisAssets.details.diseaseThumb}
          title="بياض دقيقي"
          description={diseaseDescription}
          accentColor={colors.warning}
        />

        <InfoSectionCard title="الاعراض" bullets={symptoms} top={253} sx={sx} sy={sy} />
        <InfoSectionCard title="اسباب الاصابة" bullets={causes} top={397} sx={sx} sy={sy} />
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
