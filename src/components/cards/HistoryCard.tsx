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

function formatHistoryTimestamp(dateLabel: string) {
  const normalized = dateLabel.replace(/\s+/g, " ").trim();
  const meridiemMatch = normalized.match(/\b(AM|PM)\b/i);
  const meridiem =
    meridiemMatch?.[1].toUpperCase() === "PM"
      ? "م"
      : meridiemMatch?.[1].toUpperCase() === "AM"
        ? "ص"
        : "";
  const withoutMeridiem = normalized.replace(/\b(AM|PM)\b/gi, "").trim();
  const segments = withoutMeridiem.split(/\s*-\s*/).map((segment) => segment.trim()).filter(Boolean);
  const timeSegment = segments.find((segment) => /\d{1,2}:\d{2}/.test(segment)) ?? "";
  const dateSegment = segments.find((segment) => !/\d{1,2}:\d{2}/.test(segment)) ?? withoutMeridiem;

  return {
    date: dateSegment,
    time: [timeSegment, meridiem].filter(Boolean).join(" ").trim(),
  };
}

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
  const timestamp = formatHistoryTimestamp(item.dateLabel);

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
      <View
        style={[
          styles.timestampRow,
          {
            left: sx(20),
            top: sy(24),
            width: sx(220),
            gap: sx(6),
          },
        ]}
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.82}
          style={[
            styles.timestampDate,
            {
              fontSize: sx(18),
              maxWidth: sx(148),
            },
          ]}
        >
          {timestamp.date}
        </Text>
        {timestamp.time ? (
          <>
            <Text style={[styles.timestampSeparator, { fontSize: sx(14) }]}>•</Text>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.9}
              style={[
                styles.timestampTime,
                {
                  fontSize: sx(18),
                  maxWidth: sx(66),
                },
              ]}
            >
              {timestamp.time}
            </Text>
          </>
        ) : null}
      </View>

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
  timestampRow: {
    position: "absolute",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  timestampDate: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  timestampSeparator: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    includeFontPadding: false,
  },
  timestampTime: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "left",
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
