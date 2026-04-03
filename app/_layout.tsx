import { Tajawal_400Regular, Tajawal_700Bold, useFonts } from "@expo-google-fonts/tajawal";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  GlobalErrorBoundary,
  type GlobalErrorBoundaryFallbackProps,
} from "@/src/components/errors/GlobalErrorBoundary";
import { ROUTES } from "@/src/constants/routes";
import { useGlobalFatalErrorBridge } from "@/src/hooks/useGlobalFatalErrorBridge";
import { ConnectivityProvider, useConnectivity } from "@/src/providers/ConnectivityProvider";
import { ErrorNoConnectionScreen } from "@/src/screens/ErrorNoConnectionScreen";
import { UnexpectedErrorFallbackScreen } from "@/src/screens/UnexpectedErrorFallbackScreen";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Tajawal_400Regular,
    Tajawal_700Bold,
  });

  useEffect(() => {
    if (fontError) {
      console.warn("Failed to load Tajawal fonts. Falling back to system fonts.", fontError);
    }
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ConnectivityProvider>
        <RootAppShell />
      </ConnectivityProvider>
    </SafeAreaProvider>
  );
}

function RootAppShell() {
  const router = useRouter();
  const [fatalError, setFatalError] = useState<Error | null>(null);
  const [boundaryVersion, setBoundaryVersion] = useState(0);

  useGlobalFatalErrorBridge((error) => {
    setFatalError(error);
  });

  const resetBoundary = () => {
    setFatalError(null);
    setBoundaryVersion((currentVersion) => currentVersion + 1);
  };

  const handleGoHome = () => {
    resetBoundary();
    router.replace(ROUTES.home);
  };

  const renderFallback = ({ reset }: GlobalErrorBoundaryFallbackProps) => (
    <UnexpectedErrorFallbackScreen onTryAgain={reset} onGoHome={handleGoHome} />
  );

  return (
    <GlobalErrorBoundary
      key={boundaryVersion}
      externalError={fatalError}
      fallback={renderFallback}
      onReset={resetBoundary}
      onError={(error) => {
        console.error(error);
      }}
    >
      <RootBoundaryContent />
    </GlobalErrorBoundary>
  );
}

function RootBoundaryContent() {
  const { hasResolved, isOffline, refresh } = useConnectivity();

  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false }} />
      {hasResolved && isOffline ? (
        <View pointerEvents="auto" style={styles.offlineOverlay}>
          <ErrorNoConnectionScreen onRetry={refresh} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
  },
});
