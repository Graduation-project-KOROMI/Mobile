import { Image, Pressable, StyleSheet, View } from "react-native";

type ScaleFn = (value: number) => number;

type AppTopBarProps = {
  sx: ScaleFn;
  sy: ScaleFn;
  logoUri: string;
  profileUri?: string;
  menuUri?: string;
  onMenuPress?: () => void;
};

export function AppTopBar({
  sx,
  sy,
  logoUri,
  profileUri,
  menuUri,
  onMenuPress,
}: AppTopBarProps) {
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
        onMenuPress ? (
          <Pressable
            onPress={onMenuPress}
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
        ) : (
          <Image
            source={{ uri: menuUri }}
            style={{
              position: "absolute",
              right: sx(23),
              top: sy(43),
              width: sx(40),
              height: sy(27),
            }}
            resizeMode="contain"
          />
        )
      ) : null}
    </View>
  );
}
