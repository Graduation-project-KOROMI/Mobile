import { Tajawal_400Regular, Tajawal_700Bold, useFonts } from "@expo-google-fonts/tajawal";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Tajawal_400Regular,
    Tajawal_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
