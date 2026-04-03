import * as Linking from "expo-linking";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

type ScaleFn = (value: number) => number;

export type TeamMember = {
  name: string;
  avatarUri: string;
  instagramUrl?: string;
  facebookUrl?: string;
  whatsappUrl?: string;
};

type SocialIcons = {
  instagram: string;
  facebook: string;
  whatsapp: string;
};

type TeamMemberCardProps = {
  member: TeamMember;
  sx: ScaleFn;
  sy: ScaleFn;
  icons: SocialIcons;
};

function SocialIcon({
  uri,
  sx,
  sy,
  onPress,
}: {
  uri: string;
  sx: ScaleFn;
  sy: ScaleFn;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        width: sx(25),
        height: sy(25),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri }}
        style={{ width: sx(25), height: sy(25) }}
        resizeMode="contain"
      />
    </Pressable>
  );
}

export function TeamMemberCard({ member, sx, sy, icons }: TeamMemberCardProps) {
  const instagramUrl = member.instagramUrl;
  const facebookUrl = member.facebookUrl;
  const whatsappUrl = member.whatsappUrl;

  return (
    <View
      style={{
        height: sy(94),
      }}
    >
      <Image
        source={{ uri: member.avatarUri }}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: sx(80),
          height: sy(80),
          borderRadius: sx(40),
        }}
        resizeMode="cover"
      />

      <Text
        style={[
          styles.memberName,
          {
            fontSize: sx(16),
            lineHeight: sy(19),
            width: sx(142),
          },
        ]}
      >
        {member.name}
      </Text>

      <View
        style={{
          position: "absolute",
          left: sx(22),
          top: sy(40),
          flexDirection: "row",
          alignItems: "center",
          gap: sx(11),
        }}
      >
        <SocialIcon
          uri={icons.instagram}
          sx={sx}
          sy={sy}
          onPress={instagramUrl ? () => Linking.openURL(instagramUrl) : undefined}
        />
        <SocialIcon
          uri={icons.facebook}
          sx={sx}
          sy={sy}
          onPress={facebookUrl ? () => Linking.openURL(facebookUrl) : undefined}
        />
        <SocialIcon
          uri={icons.whatsapp}
          sx={sx}
          sy={sy}
          onPress={whatsappUrl ? () => Linking.openURL(whatsappUrl) : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  memberName: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
