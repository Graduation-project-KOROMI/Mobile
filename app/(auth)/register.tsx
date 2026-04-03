import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { AppTextField } from "@/src/components/controls/AppTextField";
import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { SettingsFieldRow } from "@/src/components/controls/SettingsFieldRow";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { authAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

export default function RegisterRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AppScreenBackground
      backgroundColor={colors.screenBackground}
      style={styles.screen}
    >
      <View
        style={[
          styles.card,
          {
            width: sx(345),
            height: sy(678),
            marginTop: sy(87),
            borderRadius: sx(45),
            shadowRadius: sx(18),
            elevation: Math.max(3, Math.round(sx(6))),
          },
        ]}
      >
        <Image
          source={{ uri: authAssets.appIcon }}
          style={{
            position: "absolute",
            top: sy(28),
            alignSelf: "center",
            width: sx(59),
            height: sy(60),
          }}
          resizeMode="contain"
        />

        <Text
          style={[
            styles.title,
            {
              top: sy(139),
              width: sx(280),
              fontSize: sx(36),
            },
          ]}
        >
          انضم إلينا
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              top: sy(187),
              width: sx(280),
              fontSize: sx(12),
            },
          ]}
        >
          ابدأ تشخيصًا أدق لمحصولك
        </Text>

        <SettingsFieldRow
          style={{
            position: "absolute",
            top: sy(253),
            left: sx(13),
            width: sx(320),
            gap: sx(10),
          }}
        >
          <AppTextField
            value={lastName}
            onChangeText={setLastName}
            placeholder="اسم العائلة"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="words"
            autoCorrect={false}
            containerStyle={{
              width: sx(155),
              height: sy(58),
              borderRadius: sx(16),
            }}
            inputStyle={{
              fontSize: sx(12),
              paddingHorizontal: sx(20),
            }}
          />

          <AppTextField
            value={firstName}
            onChangeText={setFirstName}
            placeholder="الاسم الاول"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="words"
            autoCorrect={false}
            iconUri={authAssets.register.iconUser}
            containerStyle={{
              width: sx(155),
              height: sy(58),
              borderRadius: sx(16),
            }}
            inputStyle={{
              fontSize: sx(12),
              paddingRight: sx(48),
              paddingLeft: sx(20),
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
          onChangeText={setEmail}
          placeholder="البريد الالكتروني"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          iconUri={authAssets.register.iconEmail}
          containerStyle={{
            position: "absolute",
            top: sy(326),
            left: sx(13),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          inputStyle={{
            fontSize: sx(12),
            paddingRight: sx(58),
          }}
          iconStyle={{
            right: sx(20),
            width: sx(25),
            height: sy(25),
          }}
        />

        <AppTextField
          value={password}
          onChangeText={setPassword}
          placeholder="كلمة المرور"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          iconUri={authAssets.register.iconLock}
          containerStyle={{
            position: "absolute",
            top: sy(399),
            left: sx(13),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          inputStyle={{
            fontSize: sx(12),
            paddingRight: sx(58),
          }}
          iconStyle={{
            right: sx(20),
            width: sx(25),
            height: sy(25),
          }}
        />

        <AppTextField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="تاكيد كلمة المرور"
          placeholderTextColor={colors.textMuted}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={{
            position: "absolute",
            top: sy(472),
            left: sx(13),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          inputStyle={{
            fontSize: sx(12),
            paddingHorizontal: sx(20),
          }}
        />

        <PrimaryButton
          label="إنشاء حساب"
          style={{
            position: "absolute",
            top: sy(545),
            left: sx(13),
            width: sx(320),
            height: sy(58),
            borderRadius: sx(16),
          }}
          textStyle={{
            fontSize: sx(24),
          }}
        />

        <Pressable
          style={[
            styles.loginButton,
            {
              top: sy(618),
              alignSelf: "center",
              width: sx(197),
            },
          ]}
          onPress={() => router.replace(ROUTES.login)}
        >
          <Text
            style={[
              styles.loginText,
              {
                fontSize: sx(11),
              },
            ]}
          >
            <Text style={styles.loginQuestion}>لديك حساب بالفعل؟ </Text>
            <Text style={styles.loginAction}>تسجيل الدخول</Text>
          </Text>
        </Pressable>
      </View>
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  card: {
    position: "relative",
    backgroundColor: colors.cardBackground,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
  },
  title: {
    position: "absolute",
    alignSelf: "center",
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  subtitle: {
    position: "absolute",
    alignSelf: "center",
    color: colors.textMuted,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  loginButton: {
    position: "absolute",
    alignItems: "center",
  },
  loginText: {
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  loginQuestion: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
  },
  loginAction: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
  },
});
