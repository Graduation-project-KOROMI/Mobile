import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  TeamMemberCard,
  type TeamMember,
} from "@/src/components/cards/TeamMemberCard";
import { SecondaryButton } from "@/src/components/controls/SecondaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { infoAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const teamMembers: TeamMember[] = [
  {
    name: "محمد ابو حسن",
    role: "مطور كرومي",
    avatarUri: infoAssets.team.memberPhoto,
    instagramUrl: "https://www.instagram.com/mabuhasan_tech?igsh=a242MW9jdXJlYnM3&utm_source=qr",
    facebookUrl: "https://www.facebook.com/mohammad.mohnad.31",
  },
  {
    name: "اسيد هلال",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "شادي صبح",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "وليد انور",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "عمر ابو حجة",
    role: "عضو فريق كرومي",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
] as const;

export default function TeamRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();

  return (
    <AppScreenBackground
      backgroundUri={infoAssets.team.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={infoAssets.team.logo}
        profileUri={infoAssets.team.profile}
        menuUri={infoAssets.team.menu}
        sidebarCurrentItem="about"
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={118}
        width={345}
        height={620}
        borderRadius={42}
        style={{
          paddingTop: sy(22),
          paddingHorizontal: sx(18),
          paddingBottom: sy(18),
        }}
      >
        <BackButton
          iconUri={infoAssets.team.arrow}
          sx={sx}
          sy={sy}
          top={18}
          right={22}
          fallbackRoute={ROUTES.aboutKoromi}
        />

        <View style={styles.cardContent}>
          <Text style={[styles.title, { fontSize: sx(20), lineHeight: sy(24) }]}>فريقنا</Text>

          <View
            style={[
              styles.heroCard,
              {
                marginTop: sy(18),
                borderRadius: sx(24),
                paddingHorizontal: sx(16),
                paddingVertical: sy(14),
              },
            ]}
          >
            <Image
              source={{ uri: infoAssets.team.illustration }}
              style={{
                width: sx(84),
                height: sy(84),
              }}
              resizeMode="contain"
            />

            <View style={[styles.heroTextBlock, { marginRight: sx(14) }]}>
              <Text style={[styles.heroEyebrow, { fontSize: sx(12), lineHeight: sy(16) }]}>
                وراء كرومي
              </Text>
              <Text style={[styles.heroTitle, { fontSize: sx(18), lineHeight: sy(24) }]}>
                فريق يصمّم تجربة أبسط للتشخيص
              </Text>
              <Text style={[styles.heroSubtitle, { fontSize: sx(13), lineHeight: sy(19) }]}>
                تعرف على الأشخاص الذين يعملون على بناء كرومي وتحسين تجربة الاستخدام.
              </Text>
            </View>
          </View>

          <View style={[styles.sectionHeader, { marginTop: sy(18) }]}>
            <Text style={[styles.sectionTitle, { fontSize: sx(16), lineHeight: sy(20) }]}>
              أعضاء الفريق
            </Text>
            <Text style={[styles.sectionMeta, { fontSize: sx(12), lineHeight: sy(16) }]}>
              {teamMembers.length} أعضاء
            </Text>
          </View>

          <ScrollView
            style={{ flex: 1, marginTop: sy(12) }}
            contentContainerStyle={{
              paddingBottom: sy(8),
              gap: sy(12),
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                sx={sx}
                sy={sy}
                icons={{
                  instagram: infoAssets.team.iconInstagram,
                  facebook: infoAssets.team.iconFacebook,
                  whatsapp: infoAssets.team.iconWhatsapp,
                }}
              />
            ))}
          </ScrollView>

          <SecondaryButton
            label="العودة إلى عن كرومي"
            onPress={() => router.replace(ROUTES.aboutKoromi)}
            style={{
              width: "100%",
              height: sy(56),
              borderRadius: sx(18),
              marginTop: sy(12),
            }}
            textStyle={{
              fontSize: sx(18),
              lineHeight: sy(22),
            }}
          />
        </View>
      </ContentCard>

      <AppBottomNav
        sx={sx}
        sy={sy}
        active={null}
        icons={{
          settings: infoAssets.team.navSettings,
          history: infoAssets.team.navHistory,
          home: infoAssets.team.navHome,
        }}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  heroCard: {
    backgroundColor: "#F7FFF5",
    borderWidth: 1,
    borderColor: "#D9F3D2",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  heroTextBlock: {
    flex: 1,
    alignItems: "flex-end",
  },
  heroEyebrow: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontFamily: "Tajawal_400Regular",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  sectionMeta: {
    color: colors.textMuted,
    fontFamily: "Tajawal_700Bold",
    textAlign: "left",
    includeFontPadding: false,
  },
});
