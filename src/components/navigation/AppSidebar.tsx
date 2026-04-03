import { useRouter } from "expo-router";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

import {
  ROUTES,
  sidebarDestinations,
  type SidebarItemKey,
} from "@/src/constants/routes";
import { sharedAssets } from "@/src/constants/assets";
import { colors } from "@/src/theme/colors";

type ScaleFn = (value: number) => number;

type SidebarMenuItem = {
  key: SidebarItemKey;
  label: string;
  iconUri: string;
};

export type AppSidebarProps = {
  visible: boolean;
  sx: ScaleFn;
  sy: ScaleFn;
  currentItem?: SidebarItemKey;
  onClose: () => void;
};

const menuItems: SidebarMenuItem[] = [
  {
    key: "home",
    label: "الرئيسية",
    iconUri: sharedAssets.sidebar.home,
  },
  {
    key: "history",
    label: "السجل",
    iconUri: sharedAssets.sidebar.history,
  },
  {
    key: "settings",
    label: "الاعدادات",
    iconUri: sharedAssets.sidebar.settings,
  },
  {
    key: "about",
    label: "عن كرومي",
    iconUri: sharedAssets.sidebar.about,
  },
];

function MenuButton({
  item,
  sx,
  sy,
  onPress,
}: {
  item: SidebarMenuItem;
  sx: ScaleFn;
  sy: ScaleFn;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.menuButton,
        {
          width: sx(320),
          height: sy(58),
          borderRadius: sx(16),
          paddingHorizontal: sx(18),
          gap: sx(12),
        },
      ]}
    >
      <Image
        source={{ uri: item.iconUri }}
        style={{ width: sx(25), height: sy(25) }}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.menuLabel,
          {
            fontSize: sx(12),
            width: sx(100),
          },
        ]}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

export function AppSidebar({ visible, sx, sy, currentItem, onClose }: AppSidebarProps) {
  const router = useRouter();

  const handleSelect = (item: SidebarItemKey) => {
    onClose();

    if (item === currentItem) {
      return;
    }

    router.replace(sidebarDestinations[item]);
  };

  const handleLogout = () => {
    onClose();
    router.replace(ROUTES.login);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlayRoot}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />

        <View style={styles.contentLayer}>
          <Image
            source={{ uri: sharedAssets.sidebar.profile }}
            style={{
              position: "absolute",
              left: sx(24),
              top: sy(37),
              width: sx(40),
              height: sy(40),
            }}
            resizeMode="contain"
          />

          <Image
            source={{ uri: sharedAssets.sidebar.logo }}
            style={{
              position: "absolute",
              top: sy(27),
              alignSelf: "center",
              width: sx(60),
              height: sy(60),
            }}
            resizeMode="contain"
          />

          <Pressable
            onPress={onClose}
            style={{
              position: "absolute",
              right: sx(23),
              top: sy(43),
              width: sx(40),
              height: sy(27),
            }}
          >
            <Image
              source={{ uri: sharedAssets.sidebar.menu }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </Pressable>

          <View
            style={[
              styles.card,
              {
                top: sy(101),
                left: sx(24),
                width: sx(345),
                height: sy(414),
                borderRadius: sx(45),
                shadowRadius: sx(18),
                elevation: Math.max(3, Math.round(sx(6))),
                paddingTop: sy(31),
                gap: sy(6),
              },
            ]}
          >
            {menuItems.map((item) => (
              <MenuButton
                key={item.key}
                item={item}
                sx={sx}
                sy={sy}
                onPress={() => handleSelect(item.key)}
              />
            ))}
          </View>

          <Pressable
            onPress={handleLogout}
            style={[
              styles.logoutButton,
              {
                left: sx(37),
                top: sy(439),
                width: sx(320),
                height: sy(58),
                borderRadius: sx(16),
              },
            ]}
          >
            <Text style={[styles.logoutText, { fontSize: sx(24) }]}>تسجيل الخروج</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayRoot: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.36)",
  },
  contentLayer: {
    flex: 1,
  },
  card: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    alignItems: "center",
  },
  menuButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  menuLabel: {
    fontFamily: "Tajawal_700Bold",
    color: colors.textPrimary,
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  logoutButton: {
    position: "absolute",
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontFamily: "Tajawal_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
