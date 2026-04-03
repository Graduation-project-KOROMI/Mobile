import { Tajawal_400Regular, Tajawal_700Bold, useFonts } from "@expo-google-fonts/tajawal";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GlobalErrorBoundary } from "@/src/components/errors/GlobalErrorBoundary";
import { useGlobalFatalErrorBridge } from "@/src/hooks/useGlobalFatalErrorBridge";
import { ROUTES } from "@/src/navigation/routes";
import { ConnectivityProvider, useConnectivity } from "@/src/providers/ConnectivityProvider";
import { ErrorNoConnectionScreen } from "@/src/screens/ErrorNoConnectionScreen";
import { UnexpectedErrorFallbackScreen } from "@/src/screens/UnexpectedErrorFallbackScreen";

// ─── Root Layout Shell ───────────────────────────────────────────────────────
// The RootLayoutShell is responsible for setting up global providers, loading fonts, and handling global errors. It serves as the foundation for the entire app's UI.
export function RootLayoutShell() {
    const [fontsLoaded, fontError] = useFonts({
        Tajawal_400Regular,
        Tajawal_700Bold
    });

    useEffect(() => {
        if (fontError) {
            console.warn("Failed to load Tajawal fonts. Falling back to system fonts.", fontError);
        }
    }, [fontError]);

    if (!fontsLoaded && !fontError) return null;

    return (
        <SafeAreaProvider>
            <ConnectivityProvider>
                <RootAppShell />
            </ConnectivityProvider>
        </SafeAreaProvider>
    );
}
// ─── Root App Shell ───────────────────────────────────────────────────────────
// The RootAppShell handles global error boundaries and renders the main app stack. It also listens for fatal errors from anywhere in the app and displays a fallback UI when they occur.
function RootAppShell() {
    const router = useRouter();
    const [fatalError, setFatalError] = useState<Error | null>(null);
    const [boundaryKey, setBoundaryKey] = useState(0);

    useGlobalFatalErrorBridge(setFatalError);

    const reset = () => {
        setFatalError(null);
        setBoundaryKey((k) => k + 1);
    };
    // If a fatal error is captured, show the fallback UI. Otherwise, render the app stack.
    return (
        <GlobalErrorBoundary
            key={boundaryKey}
            externalError={fatalError}
            fallback={({ reset: boundaryReset }) => (
                <UnexpectedErrorFallbackScreen
                    onTryAgain={boundaryReset}
                    onGoHome={() => {
                        reset();
                        router.replace(ROUTES.home);
                    }}
                />
            )}
            onReset={reset}
            onError={console.error}
        >
            <OfflineAwareStack />
        </GlobalErrorBoundary>
    );
}

// ─── Offline Aware Stack ──────────────────────────────────────────────────────
// This component renders the main app stack and overlays an offline screen if the device is not connected to the internet.
function OfflineAwareStack() {
    const { hasResolved, isOffline, refresh } = useConnectivity();

    return (
        <View style={styles.root}>
            <Stack screenOptions={{ headerShown: false }} />
            {hasResolved && isOffline && (
                <View pointerEvents="auto" style={styles.offlineOverlay}>
                    <ErrorNoConnectionScreen onRetry={refresh} />
                </View>
            )}
        </View>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    root: { flex: 1 },
    offlineOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        elevation: 1000,
    },
});