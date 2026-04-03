import * as Linking from "expo-linking";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/src/theme/colors";

type ScaleFn = (value: number) => number;

export type TeamMember = {
  name: string;
  avatarUri: string;
  role?: string;
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

async function openExternalUrl(url: string) {
  const canOpen = await Linking.canOpenURL(url);

  if (canOpen) {
    await Linking.openURL(url);
  }
}

function SocialIcon({
  uri,
  sx,
  sy,
  onPress,
}: {
  uri: string;
  sx: ScaleFn;
  sy: ScaleFn;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[
        styles.socialButton,
        {
          width: sx(34),
          height: sy(34),
          borderRadius: sx(17),
        },
      ]}
    >
      <Image
        source={{ uri }}
        style={{ width: sx(18), height: sy(18) }}
        resizeMode="contain"
      />
    </Pressable>
  );
}

export function TeamMemberCard({ member, sx, sy, icons }: TeamMemberCardProps) {
  const links = [
    member.instagramUrl
      ? {
          key: "instagram",
          iconUri: icons.instagram,
          onPress: () => {
            void openExternalUrl(member.instagramUrl!);
          },
        }
      : null,
    member.facebookUrl
      ? {
          key: "facebook",
          iconUri: icons.facebook,
          onPress: () => {
            void openExternalUrl(member.facebookUrl!);
          },
        }
      : null,
    member.whatsappUrl
      ? {
          key: "whatsapp",
          iconUri: icons.whatsapp,
          onPress: () => {
            void openExternalUrl(member.whatsappUrl!);
          },
        }
      : null,
  ].filter(Boolean) as { key: string; iconUri: string; onPress: () => void }[];

  return (
    <View
      style={[
        styles.card,
        {
          minHeight: sy(106),
          borderRadius: sx(24),
          paddingHorizontal: sx(14),
          paddingVertical: sy(13),
        },
      ]}
    >
      <View style={[styles.row, { gap: sx(14) }]}>
        <Image
          source={{ uri: member.avatarUri }}
          style={{
            width: sx(74),
            height: sy(74),
            borderRadius: sx(37),
          }}
          resizeMode="cover"
        />

        <View style={styles.infoColumn}>
          <Text
            style={[
              styles.memberName,
              {
                fontSize: sx(17),
                lineHeight: sy(22),
              },
            ]}
          >
            {member.name}
          </Text>

          <Text
            style={[
              styles.memberRole,
              {
                marginTop: sy(2),
                fontSize: sx(12),
                lineHeight: sy(16),
              },
            ]}
          >
            {member.role ?? "عضو فريق كرومي"}
          </Text>

          {links.length > 0 ? (
            <View style={[styles.linksRow, { marginTop: sy(10), gap: sx(8) }]}>
              {links.map((link) => (
                <SocialIcon
                  key={link.key}
                  uri={link.iconUri}
                  sx={sx}
                  sy={sy}
                  onPress={link.onPress}
                />
              ))}
            </View>
          ) : (
            <View
              style={[
                styles.placeholderChip,
                {
                  marginTop: sy(10),
                  borderRadius: sx(14),
                  paddingHorizontal: sx(12),
                  paddingVertical: sy(7),
                },
              ]}
            >
              <Text
                style={[
                  styles.placeholderText,
                  {
                    fontSize: sx(11),
                    lineHeight: sy(15),
                  },
                ]}
              >
                بيانات التواصل قريباً
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#F9FFF8",
    borderWidth: 1,
    borderColor: "#DCEED8",
  },
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  infoColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  memberName: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  memberRole: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  linksRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEED8",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCEED8",
  },
  placeholderText: {
    color: colors.textMuted,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
