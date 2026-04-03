import { StyleSheet, Text } from "react-native";

import { InfoSectionCard } from "@/src/components/cards/InfoSectionCard";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { diagnosisAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const treatmentSections = [
  {
    title: "علاج كيميائي",
    bullets: [
      "استخدام مبيدات فطرية مثل الكبريت أو المبيدات الجهازية",
      "تكرار الرش حسب شدة الإصابة",
      "الالتزام بالجرعات الموصى بها لتجنب ضرر النبات",
    ],
  },
  {
    title: "علاج عضوي",
    bullets: [
      "رش محلول بيكربونات الصوديوم (صودا الخبز) مع الماء",
      "استخدام زيت النيم أو الزيوت النباتية",
      "الاعتماد على مستخلصات طبيعية مضادة للفطريات",
    ],
  },
  {
    title: "طرق الوقاية",
    bullets: [
      "تحسين التهوية بين النباتات عبر التقليم",
      "تقليل الرطوبة وتجنب الري الزائد",
      "فحص الأوراق بشكل دوري لاكتشاف الإصابة مبكرًا",
    ],
  },
  {
    title: "موعد التطبيق",
    bullets: [
      "البدء بالعلاج عند ظهور أول أعراض",
      "الرش في الصباح الباكر أو المساء",
      "تكرار المعالجة كل 7-10 أيام حسب الحاجة",
    ],
  },
];

export default function TreatmentRoute() {
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground
      backgroundUri={diagnosisAssets.treatment.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={diagnosisAssets.treatment.logo}
        profileUri={diagnosisAssets.treatment.profile}
        menuUri={diagnosisAssets.treatment.menu}
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
          iconUri={diagnosisAssets.treatment.back}
          sx={sx}
          sy={sy}
          top={20}
          right={38}
          fallbackRoute={ROUTES.resultDisease}
        />

        <Text style={[styles.screenTitle, { marginTop: sy(20), fontSize: sx(20) }]}>
          طرق العلاج والوقاية
        </Text>

        {treatmentSections.map((section, index) => (
          <InfoSectionCard
            key={section.title}
            title={section.title}
            bullets={section.bullets}
            top={71 + index * 137}
            sx={sx}
            sy={sy}
          />
        ))}
      </ContentCard>

      <AppBottomNav
        sx={sx}
        sy={sy}
        active={null}
        icons={{
          settings: diagnosisAssets.treatment.navSettings,
          history: diagnosisAssets.treatment.navHistory,
          home: diagnosisAssets.treatment.navHome,
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
