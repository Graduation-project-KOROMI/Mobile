import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

type ScaleFn = (value: number) => number;

export type HistoryStatus = "healthy" | "diseased";

export type PredictionHistoryEntry = {
  id: string;
  dateLabel: string;
  statusLabel: string;
  status: HistoryStatus;
  imageUri: string;
};

type HistoryCardProps = {
  item: PredictionHistoryEntry;
  top: number;
  sx: ScaleFn;
  sy: ScaleFn;
  trashIconUri: string;
  shareIconUri: string;
  onPress: () => void;
};

export function HistoryCard({
  item,
  top,
  sx,
  sy,
  trashIconUri,
  shareIconUri,
  onPress,
}: HistoryCardProps) {
  const isHealthy = item.status === "healthy";

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          top: sy(top),
          left: sx(17),
          width: sx(360),
          height: sy(126),
          borderRadius: sx(16),
          shadowRadius: sx(18),
          elevation: Math.max(3, Math.round(sx(6))),
        },
      ]}
    >
      <Text
        style={[
          styles.date,
          {
            left: sx(36),
            top: sy(23),
            width: sx(202),
            fontSize: sx(20),
          },
        ]}
      >
        {item.dateLabel}
      </Text>

      <Image
        source={{ uri: item.imageUri }}
        style={{
          position: "absolute",
          right: sx(9),
          top: sy(13),
          width: sx(100),
          height: sy(100),
          borderRadius: sx(16),
        }}
        resizeMode="cover"
      />

      <View
        style={[
          styles.statusPill,
          {
            right: sx(122),
            top: sy(63),
            width: sx(isHealthy ? 99 : 125),
            height: sy(34.4),
            borderRadius: sx(40),
            backgroundColor: isHealthy ? colors.primary : "#CF2E38",
          },
        ]}
      >
        <Text style={[styles.statusText, { fontSize: sx(15) }]}>{item.statusLabel}</Text>
      </View>

      <Pressable
        hitSlop={8}
        style={{
          position: "absolute",
          left: sx(21),
          top: sy(80),
          width: sx(30),
          height: sy(30),
        }}
      >
        <Image
          source={{ uri: trashIconUri }}
          style={{ width: sx(30), height: sy(30) }}
          resizeMode="contain"
        />
      </Pressable>

      <Pressable
        hitSlop={8}
        style={{
          position: "absolute",
          left: sx(64),
          top: sy(80),
          width: sx(30),
          height: sy(30),
        }}
      >
        <Image
          source={{ uri: shareIconUri }}
          style={{ width: sx(30), height: sy(30) }}
          resizeMode="contain"
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
  },
  date: {
    position: "absolute",
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    includeFontPadding: false,
  },
  statusPill: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#FFFFFF",
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
