import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { BOTTOM_NAV_ITEMS } from "@/src/navigation/menu";
import { bottomNavDestinations, type BottomNavKey } from "@/src/navigation/routes";
import type { ScaleFn } from "@/src/shared/types/scale";
import { colors } from "@/src/theme/colors";

type NavIcons = {
  settings: string;
  history: string;
  home: string;
};

export type AppBottomNavProps = {
  sx: ScaleFn;
  sy: ScaleFn;
  icons: NavIcons;
  active?: BottomNavKey | null;
};

const indicatorOffsets: Record<BottomNavKey, number> = {
  settings: 16,
  history: 145,
  home: 274,
};

function BottomNavItem({
  iconUri,
  label,
  sx,
  sy,
  onPress,
}: {
  iconUri: string;
  label: string;
  sx: ScaleFn;
  sy: ScaleFn;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.navItem, { width: sx(79), gap: sy(6) }]}>
      <Image
        source={{ uri: iconUri }}
        style={{ width: sx(30), height: sy(30) }}
        resizeMode="contain"
      />
      <Text style={[styles.navText, { fontSize: sx(16) }]}>{label}</Text>
    </Pressable>
  );
}

export function AppBottomNav({ sx, sy, icons, active = null }: AppBottomNavProps) {
  const router = useRouter();

  return (
    <View
      style={[
        styles.bottomBar,
        {
          height: sy(76),
          borderTopLeftRadius: sx(16),
          borderTopRightRadius: sx(16),
        },
      ]}
    >
      {active ? (
        <View
          style={[
            styles.activeIndicator,
            {
              width: sx(103),
              height: sy(6),
              left: sx(indicatorOffsets[active]),
              bottom: sy(5),
              borderRadius: sx(16),
            },
          ]}
        />
      ) : null}

      <View style={styles.bottomItemsRow}>
        {BOTTOM_NAV_ITEMS.map((item) => (
          <BottomNavItem
            key={item.key}
            iconUri={icons[item.key]}
            label={item.label}
            sx={sx}
            sy={sy}
            onPress={() => router.replace(bottomNavDestinations[item.key])}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  activeIndicator: {
    position: "absolute",
    backgroundColor: colors.primary,
  },
  bottomItemsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
