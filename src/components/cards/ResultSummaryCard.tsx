import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

type ScaleFn = (value: number) => number;

type ResultSummaryCardProps = {
  sx: ScaleFn;
  sy: ScaleFn;
  top: number;
  thumbnailUri: string;
  description: string;
  accentColor: string;
  title?: string;
  onPress?: () => void;
};

export function ResultSummaryCard({
  sx,
  sy,
  top,
  thumbnailUri,
  description,
  accentColor,
  title,
  onPress,
}: ResultSummaryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.card,
        {
          top: sy(top),
          width: sx(310),
          height: sy(126),
          borderRadius: sx(20),
        },
      ]}
    >
      <Image
        source={{ uri: thumbnailUri }}
        style={{
          position: "absolute",
          right: sx(8),
          top: sy(7),
          width: sx(110),
          height: sy(110),
          borderRadius: sx(16),
        }}
        resizeMode="cover"
      />

      <View
        style={{
          position: "absolute",
          left: sx(14),
          right: sx(126),
          top: sy(title ? 14 : 25),
        }}
      >
        {title ? (
          <Text style={[styles.title, { fontSize: sx(16), color: accentColor }]}>{title}</Text>
        ) : null}

        <Text
          style={[
            styles.description,
            {
              marginTop: sy(title ? 8 : 0),
              fontSize: sx(12),
              lineHeight: sy(14),
              color: title ? accentColor : colors.textPrimary,
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    backgroundColor: "#F2F2F2",
  },
  title: {
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  description: {
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
