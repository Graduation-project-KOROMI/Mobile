import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { AppTextField } from "@/src/components/controls/AppTextField";
import { SettingsFieldRow } from "@/src/components/controls/SettingsFieldRow";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { mainAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

export default function SettingsRoute() {
  const { sx, sy } = useResponsiveScale();

  const [firstName, setFirstName] = useState("محمد");
  const [lastName, setLastName] = useState("ابو حسن");
  const [email] = useState("mabuhasan001@gmail.com");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <AppScreenBackground
      backgroundUri={mainAssets.settings.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={mainAssets.settings.logo}
        profileUri={mainAssets.settings.profile}
        menuUri={mainAssets.settings.menu}
        sidebarCurrentItem="settings"
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={112}
        width={345}
        height={628}
        borderRadius={45}
        style={{ alignItems: "center" }}
      >
        <BackButton
          iconUri={mainAssets.settings.back}
          sx={sx}
          sy={sy}
          top={20}
          right={32}
          fallbackRoute={ROUTES.home}
        />

        <Text style={[styles.title, { marginTop: sy(39), fontSize: sx(36) }]}>الاعدادات</Text>
        <Text style={[styles.subtitle, { marginTop: sy(18), fontSize: sx(12) }]}>
          المعلومات الشخصية
        </Text>

        <SettingsFieldRow
          style={{
            position: "absolute",
            left: sx(13),
            top: sy(153),
            width: sx(320),
            gap: sx(10),
          }}
        >
          <AppTextField
            value={lastName}
            onChangeText={setLastName}
            placeholder="اسم العائلة"
            placeholderTextColor={colors.textMuted}
            textAlign="center"
            containerStyle={{
              width: sx(155),
              height: sy(58),
              borderRadius: sx(16),
            }}
            inputStyle={{ fontSize: sx(20) }}
          />

          <AppTextField
            value={firstName}
            onChangeText={setFirstName}
            placeholder="الاسم الاول"
            placeholderTextColor={colors.textMuted}
            textAlign="center"
            iconUri={mainAssets.settings.iconUser}
            containerStyle={{
              width: sx(155),
              height: sy(58),
              borderRadius: sx(16),
            }}
            inputStyle={{
              fontSize: sx(20),
              paddingRight: sx(34),
            }}
            iconStyle={{
              right: sx(20),
              width: sx(25),
              height: sy(25),
            }}
          />
        </SettingsFieldRow>

        <AppTextField
          value={email}
          editable={false}
          iconUri={mainAssets.settings.iconEmail}
          textAlign="center"
          containerStyle={{
            position: "absolute",
            left: sx(13),
            top: sy(226),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          inputStyle={{ fontSize: sx(13) }}
          iconStyle={{
            right: sx(20),
            width: sx(25),
            height: sy(25),
          }}
        />

        <AppTextField
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="كلمة المرور القديمة"
          placeholderTextColor={colors.textPrimary}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          iconUri={mainAssets.settings.iconLock}
          textAlign="center"
          containerStyle={{
            position: "absolute",
            left: sx(13),
            top: sy(299),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          inputStyle={{
            fontSize: sx(12),
            paddingRight: sx(34),
          }}
          iconStyle={{
            right: sx(20),
            width: sx(25),
            height: sy(25),
          }}
        />

        <AppTextField
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="كلمة المرور الجديدة"
          placeholderTextColor={colors.textPrimary}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          textAlign="center"
          containerStyle={{
            position: "absolute",
            left: sx(13),
            top: sy(372),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          inputStyle={{ fontSize: sx(12) }}
        />

        <Pressable
          style={[
            styles.saveButton,
            {
              left: sx(13),
              top: sy(445),
              width: sx(320),
              height: sy(58),
              borderRadius: sx(16),
            },
          ]}
        >
          <Text style={[styles.saveButtonText, { fontSize: sx(20) }]}>احفظ التغييرات</Text>
          <Image
            source={{ uri: mainAssets.settings.iconSave }}
            style={{
              position: "absolute",
              right: sx(20),
              width: sx(30),
              height: sy(30),
              opacity: 0.8,
            }}
            resizeMode="contain"
          />
        </Pressable>

        <View
          style={{
            position: "absolute",
            left: sx(13),
            top: sy(525),
            width: sx(320),
            height: sy(2),
            borderRadius: sx(16),
            backgroundColor: colors.primary,
          }}
        />

        <Pressable
          style={[
            styles.languageButton,
            {
              left: sx(13),
              top: sy(548),
              width: sx(320),
              height: sy(58),
              borderRadius: sx(16),
            },
          ]}
        >
          <Text style={[styles.languageText, { fontSize: sx(20) }]}>تغيير اللغة</Text>
          <Image
            source={{ uri: mainAssets.settings.iconLanguage }}
            style={{
              position: "absolute",
              right: sx(20),
              width: sx(30),
              height: sy(30),
            }}
            resizeMode="contain"
          />
        </Pressable>
      </ContentCard>

      <AppBottomNav
        sx={sx}
        sy={sy}
        active="settings"
        icons={{
          settings: mainAssets.settings.navSettings,
          history: mainAssets.settings.navHistory,
          home: mainAssets.settings.navHome,
        }}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textMuted,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  saveButton: {
    position: "absolute",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  languageButton: {
    position: "absolute",
    backgroundColor: colors.inputBackground,
    justifyContent: "center",
  },
  languageText: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
