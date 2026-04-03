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
  logo: "https://www.figma.com/api/mcp/asset/989c1da9-691f-4473-99f9-199ddba398c9",
  emailIcon:
    "https://www.figma.com/api/mcp/asset/3f9eebf0-a9ca-4aaa-83e3-86dcc6bbb7ea",
  lockIcon:
    "https://www.figma.com/api/mcp/asset/0e9e5dd2-a4dd-40de-9677-22f76d4c7474",
} as const;

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
              height: sy(555),
              marginTop: sy(126),
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

          <View
            style={[
              styles.inputWrapper,
              {
                top: sy(276),
                left: sx(12.5),
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
                top: sy(349),
                left: sx(12.5),
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

          <Pressable
            style={[
              styles.loginButton,
              {
                top: sy(422),
                left: sx(12.5),
                width: sx(320),
                height: sy(58),
                borderRadius: sx(16),
              },
            ]}
          >
            <Text
              style={[
                styles.loginButtonText,
                {
                  fontSize: sx(24),
                },
              ]}
            >
              دخول
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.registerButton,
              {
                top: sy(495),
                width: sx(162),
              },
            ]}
            onPress={() => router.push("./register")}
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
  loginButton: {
    position: "absolute",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
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
    color: COLORS.textPrimary,
    fontFamily: "Tajawal_700Bold",
  },
  registerAction: {
    color: COLORS.primary,
    fontFamily: "Tajawal_700Bold",
  },
  guestButton: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
  },
  guestText: {
    color: COLORS.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
