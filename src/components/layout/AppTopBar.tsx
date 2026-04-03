import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { sharedAssets } from "@/src/constants/assets";
import { type SidebarItemKey } from "@/src/constants/routes";
import { AppSidebar } from "@/src/components/navigation/AppSidebar";

type ScaleFn = (value: number) => number;

type AppTopBarProps = {
  sx: ScaleFn;
  sy: ScaleFn;
  logoUri: string;
  profileUri?: string;
  menuUri?: string;
  onMenuPress?: () => void;
  sidebarCurrentItem?: SidebarItemKey;
};

export function AppTopBar({
  sx,
  sy,
  logoUri,
  profileUri,
  menuUri = sharedAssets.sidebar.menu,
  onMenuPress,
  sidebarCurrentItem,
}: AppTopBarProps) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const shouldUseInternalSidebar = !onMenuPress;
  const handleMenuPress = onMenuPress ?? (() => setIsSidebarVisible(true));

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {profileUri ? (
        <Image
          source={{ uri: profileUri }}
          style={{
            position: "absolute",
            left: sx(24),
            top: sy(37),
            width: sx(40),
            height: sy(40),
          }}
          resizeMode="contain"
        />
      ) : null}

      <Image
        source={{ uri: logoUri }}
        style={{
          position: "absolute",
          top: sy(27),
          alignSelf: "center",
          width: sx(60),
          height: sy(60),
        }}
        resizeMode="contain"
      />

      {menuUri ? (
        <Pressable
          onPress={handleMenuPress}
          style={{
            position: "absolute",
            right: sx(23),
            top: sy(43),
            width: sx(40),
            height: sy(27),
          }}
        >
          <Image
            source={{ uri: menuUri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </Pressable>
      ) : null}

      {shouldUseInternalSidebar ? (
        <AppSidebar
          visible={isSidebarVisible}
          sx={sx}
          sy={sy}
          currentItem={sidebarCurrentItem}
          onClose={() => setIsSidebarVisible(false)}
        />
      ) : null}
    </View>
  );
}
