import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import {
  TeamMemberCard,
  type TeamMember,
} from "@/src/components/cards/TeamMemberCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { AppSidebar } from "@/src/components/navigation/AppSidebar";
import { BackButton } from "@/src/components/navigation/BackButton";
import { infoAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const teamMembers: TeamMember[] = [
  {
    name: "محمد ابو حسن",
    avatarUri: infoAssets.team.memberPhoto,
    instagramUrl: "https://www.instagram.com/mabuhasan_tech?igsh=a242MW9jdXJlYnM3&utm_source=qr",
    facebookUrl: "https://www.facebook.com/mohammad.mohnad.31",
  },
  {
    name: "اسيد هلال",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "شادي صبح",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "وليد انور",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
  {
    name: "عمر ابو حجة",
    avatarUri: infoAssets.team.memberPlaceholder,
  },
];

export default function TeamRoute() {
  const { sx, sy } = useResponsiveScale();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
        onMenuPress={() => setIsSidebarVisible(true)}
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={102}
        width={345}
        height={655}
        borderRadius={45}
      >
        <BackButton
          iconUri={infoAssets.team.arrow}
          sx={sx}
          sy={sy}
          top={17}
          right={24}
          fallbackRoute={ROUTES.aboutKoromi}
        />

        <Text style={[styles.title, { marginTop: sy(22), fontSize: sx(20) }]}>فريقنا</Text>

        <Image
          source={{ uri: infoAssets.team.illustration }}
          style={{
            position: "absolute",
            alignSelf: "center",
            top: sy(63),
            width: sx(123),
            height: sy(95),
          }}
          resizeMode="contain"
        />

        <View
          style={{
            position: "absolute",
            top: sy(175),
            alignSelf: "center",
            width: sx(222),
            gap: sy(14),
          }}
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

      <AppSidebar
        visible={isSidebarVisible}
        sx={sx}
        sy={sy}
        onClose={() => setIsSidebarVisible(false)}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
