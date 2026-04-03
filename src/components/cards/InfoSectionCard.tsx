import { StyleSheet, Text, View } from "react-native";

type ScaleFn = (value: number) => number;

type InfoSectionCardProps = {
  title: string;
  bullets: readonly string[];
  top: number;
  sx: ScaleFn;
  sy: ScaleFn;
  accentColor?: string;
};

export function InfoSectionCard({
  title,
  bullets,
  top,
  sx,
  sy,
  accentColor = "#FB601D",
}: InfoSectionCardProps) {
  return (
    <View
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
      <Text style={[styles.title, { fontSize: sx(16), marginTop: sy(14), color: accentColor }]}>
        {title}
      </Text>
      <View style={{ marginTop: sy(10), paddingHorizontal: sx(12) }}>
        {bullets.map((bullet, index) => (
          <Text
            key={`${title}-${index}`}
            style={[
              styles.bullet,
              {
                fontSize: sx(12),
                lineHeight: sy(15),
                color: accentColor,
              },
            ]}
          >
            {`• ${bullet}`}
          </Text>
        ))}
      </View>
    </View>
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
  bullet: {
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
    marginBottom: 2,
  },
});
