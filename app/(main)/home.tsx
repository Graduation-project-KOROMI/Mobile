import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { HomeActionCard } from "@/src/components/cards/HomeActionCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { AppSidebar } from "@/src/components/navigation/AppSidebar";
import { mainAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

export default function HomeRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <AppScreenBackground
      backgroundUri={mainAssets.home.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={mainAssets.home.logo}
        profileUri={mainAssets.home.profile}
        menuUri={mainAssets.home.menu}
        onMenuPress={() => setIsSidebarVisible(true)}
      />

      <View
        style={{
          position: "absolute",
          top: sy(161),
          right: sx(23),
          width: sx(280),
          alignItems: "flex-end",
        }}
      >
        <Text style={[styles.greetingText, { fontSize: sx(36), lineHeight: sy(43) }]}>
          أهلًا بعودتك
        </Text>
        <Text style={[styles.greetingName, { fontSize: sx(36), lineHeight: sy(43) }]}>
          محمد
        </Text>
      </View>

      <Text
        style={[
          styles.subtitle,
          {
            top: sy(247),
            right: sx(23),
            width: sx(280),
            fontSize: sx(12),
          },
        ]}
      >
        دعنا نطمئن على كرومك اليوم
      </Text>

      <HomeActionCard
        title="التقط صورة"
        iconUri={mainAssets.home.camera}
        top={335}
        sx={sx}
        sy={sy}
        onPress={() => router.push(ROUTES.imagePreview)}
      />
      <HomeActionCard
        title="ارفع صورة"
        iconUri={mainAssets.home.upload}
        top={486}
        sx={sx}
        sy={sy}
        onPress={() => router.push(ROUTES.imagePreview)}
      />

      <AppBottomNav
        sx={sx}
        sy={sy}
        active="home"
        icons={{
          settings: mainAssets.home.navSettings,
          history: mainAssets.home.navHistory,
          home: mainAssets.home.navHome,
        }}
      />

      <AppSidebar
        visible={isSidebarVisible}
        sx={sx}
        sy={sy}
        currentItem="home"
        onClose={() => setIsSidebarVisible(false)}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  greetingText: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  greetingName: {
    fontFamily: "Tajawal_700Bold",
    color: colors.primary,
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  subtitle: {
    position: "absolute",
    color: colors.textMuted,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
