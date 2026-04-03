import NetInfo, { type NetInfoState } from "@react-native-community/netinfo";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AppState, type AppStateStatus } from "react-native";

type ConnectivityContextValue = {
  isOffline: boolean;
  hasResolved: boolean;
  refresh: () => Promise<void>;
};

const ConnectivityContext = createContext<ConnectivityContextValue | null>(null);

function hasResolvedConnectivity(state: NetInfoState | null) {
  return state?.isConnected != null || state?.isInternetReachable != null;
}

function isOfflineState(state: NetInfoState | null) {
  if (!hasResolvedConnectivity(state)) {
    return false;
  }

  return state?.isConnected === false || state?.isInternetReachable === false;
}

export function ConnectivityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NetInfoState | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  const refresh = useCallback(async () => {
    const nextState = await NetInfo.fetch();
    setState(nextState);
  }, []);

  useEffect(() => {
    void refresh().catch(() => undefined);

    const unsubscribe = NetInfo.addEventListener((nextState) => {
      setState(nextState);
    });

    return () => {
      unsubscribe();
    };
  }, [refresh]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const wasBackgrounded = appStateRef.current !== "active" && nextAppState === "active";
      appStateRef.current = nextAppState;

      if (wasBackgrounded) {
        void refresh().catch(() => undefined);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [refresh]);

  const value = useMemo<ConnectivityContextValue>(
    () => ({
      isOffline: isOfflineState(state),
      hasResolved: hasResolvedConnectivity(state),
      refresh,
    }),
    [refresh, state],
  );

  return <ConnectivityContext.Provider value={value}>{children}</ConnectivityContext.Provider>;
}

export function useConnectivity() {
  const context = useContext(ConnectivityContext);

  if (!context) {
    throw new Error("useConnectivity must be used within ConnectivityProvider.");
  }

  return context;
}
