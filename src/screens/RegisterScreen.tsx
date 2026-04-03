import { Tajawal_700Bold, useFonts } from "@expo-google-fonts/tajawal";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { COLORS } from "../constants/colors";

const FIGMA_ASSETS = {
  userIcon:
    "https://www.figma.com/api/mcp/asset/4ec52afe-76ab-4dba-bb1b-75cea2d5007f",
  emailIcon:
    "https://www.figma.com/api/mcp/asset/99d0a567-166b-4c61-82fc-39f17dce6e5a",
  lockIcon:
    "https://www.figma.com/api/mcp/asset/20a2cd8a-d542-41e2-9680-3d7237d5b684",
} as const;

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export default function RegisterScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fontsLoaded] = useFonts({ Tajawal_700Bold });

  const { sx, sy } = useMemo(() => {
    const scaleX = width / BASE_WIDTH;
    const scaleY = height / BASE_HEIGHT;

    return {
      sx: (value: number) => value * scaleX,
      sy: (value: number) => value * scaleY,
    };
  }, [height, width]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
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
            source={require("../../assets/images/app_icon.png")}
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

          <View
            style={[
              styles.row,
              {
                top: sy(253),
                left: sx(13),
                width: sx(320),
                gap: sx(10),
              },
            ]}
          >
            <View
              style={[
                styles.halfInput,
                {
                  width: sx(155),
                  height: sy(58),
                  borderRadius: sx(16),
                },
              ]}
            >
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="اسم العائلة"
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="words"
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    fontSize: sx(12),
                    paddingHorizontal: sx(20),
                  },
                ]}
              />
            </View>

            <View
              style={[
                styles.halfInput,
                {
                  width: sx(155),
                  height: sy(58),
                  borderRadius: sx(16),
                },
              ]}
            >
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="الاسم الاول"
                placeholderTextColor={COLORS.textMuted}
                autoCapitalize="words"
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    fontSize: sx(12),
                    paddingRight: sx(48),
                    paddingLeft: sx(20),
                  },
                ]}
              />
              <Image
                source={{ uri: FIGMA_ASSETS.userIcon }}
                style={{
                  position: "absolute",
                  right: sx(20),
                  width: sx(25),
                  height: sy(25),
                  opacity: 0.8,
                }}
              />
            </View>
          </View>

          <View
            style={[
              styles.inputWrapper,
              {
                top: sy(326),
                left: sx(13),
                width: sx(320),
                height: sy(58),
                borderRadius: sx(16),
              },
            ]}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="البريد الالكتروني"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  fontSize: sx(12),
                  paddingRight: sx(58),
                },
              ]}
            />
            <Image
              source={{ uri: FIGMA_ASSETS.emailIcon }}
              style={{
                position: "absolute",
                right: sx(20),
                width: sx(25),
                height: sy(25),
                opacity: 0.8,
              }}
            />
          </View>

          <View
            style={[
              styles.inputWrapper,
              {
                top: sy(399),
                left: sx(13),
                width: sx(320),
                height: sy(58),
                borderRadius: sx(16),
              },
            ]}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="كلمة المرور"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  fontSize: sx(12),
                  paddingRight: sx(58),
                },
              ]}
            />
            <Image
              source={{ uri: FIGMA_ASSETS.lockIcon }}
              style={{
                position: "absolute",
                right: sx(20),
                width: sx(25),
                height: sy(25),
                opacity: 0.8,
              }}
            />
          </View>

          <View
            style={[
              styles.inputWrapper,
              {
                top: sy(472),
                left: sx(13),
                width: sx(320),
                height: sy(58),
                borderRadius: sx(16),
              },
            ]}
          >
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="تاكيد كلمة المرور"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                styles.input,
                {
                  fontSize: sx(12),
                  paddingHorizontal: sx(20),
                },
              ]}
            />
          </View>

          <Pressable
            style={[
              styles.registerButton,
              {
                top: sy(545),
                left: sx(13),
                width: sx(320),
                height: sy(58),
                borderRadius: sx(16),
              },
            ]}
          >
            <Text
              style={[
                styles.registerButtonText,
                {
                  fontSize: sx(24),
                },
              ]}
            >
              إنشاء حساب
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.loginButton,
              {
                top: sy(618),
                alignSelf: "center",
                width: sx(197),
              },
            ]}
            onPress={() => router.replace("../login")}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.screenBackground,
    alignItems: "center",
  },
  card: {
    position: "relative",
    backgroundColor: COLORS.cardBackground,
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
  },
  title: {
    position: "absolute",
    alignSelf: "center",
    color: COLORS.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  subtitle: {
    position: "absolute",
    alignSelf: "center",
    color: COLORS.textMuted,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  row: {
    position: "absolute",
    flexDirection: "row",
  },
  halfInput: {
    backgroundColor: COLORS.inputBackground,
    justifyContent: "center",
  },
  inputWrapper: {
    position: "absolute",
    backgroundColor: COLORS.inputBackground,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    color: COLORS.textPrimary,
    textAlign: "right",
    writingDirection: "rtl",
    fontFamily: "Tajawal_700Bold",
  },
  registerButton: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
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
    color: COLORS.textPrimary,
    fontFamily: "Tajawal_700Bold",
  },
  loginAction: {
    color: COLORS.primary,
    fontFamily: "Tajawal_700Bold",
  },
});
