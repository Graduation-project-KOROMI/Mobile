import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { AppTextField } from "@/src/components/controls/AppTextField";
import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { authAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

export default function LoginRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            height: sy(555),
            marginTop: sy(126),
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
            top: sy(44),
            alignSelf: "center",
            width: sx(59),
            height: sy(58),
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
          كرومي يرحب بك
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
          سجّل دخولك وابدأ التشخيص فورًا
        </Text>

        <AppTextField
          value={email}
          onChangeText={setEmail}
          placeholder="البريد الالكتروني"
          placeholderTextColor={colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          iconUri={authAssets.login.iconEmail}
          containerStyle={{
            position: "absolute",
            top: sy(276),
            left: sx(12.5),
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
          iconUri={authAssets.login.iconLock}
          containerStyle={{
            position: "absolute",
            top: sy(349),
            left: sx(12.5),
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

        <PrimaryButton
          label="دخول"
          onPress={() => router.replace(ROUTES.home)}
          style={{
            position: "absolute",
            top: sy(422),
            left: sx(12.5),
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
            styles.registerButton,
            {
              top: sy(495),
              width: sx(162),
            },
          ]}
          onPress={() => router.push(ROUTES.register)}
        >
          <Text
            style={[
              styles.registerText,
              {
                fontSize: sx(11),
              },
            ]}
          >
            <Text style={styles.registerQuestion}>ليس لديك حساب؟</Text>
            <Text style={styles.registerAction}> إنشاء حساب</Text>
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace(ROUTES.home)}
          style={[
            styles.guestButton,
            {
              top: sy(523),
              width: sx(89),
            },
          ]}
        >
          <Text
            style={[
              styles.guestText,
              {
                fontSize: sx(11),
              },
            ]}
          >
            دخول كزائر
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
  registerButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  registerText: {
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  registerQuestion: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
  },
  registerAction: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
  },
  guestButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  guestText: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
