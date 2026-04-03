import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { AppSidebar } from "@/src/components/navigation/AppSidebar";
import { BackButton } from "@/src/components/navigation/BackButton";
import { infoAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

const faqIllustrationUri =
  "https://www.figma.com/api/mcp/asset/1637f484-e4dd-4a6a-97be-7f088e47dc62";

const aboutFaqItems = [
  {
    id: "what-is-koromi",
    question: "ما هو تطبيق كرومي؟",
    answer:
      "كرومي تطبيق ذكي يساعدك على تحليل صور أوراق النباتات بسرعة ودقة، ليحوّل التشخيص إلى تجربة واضحة ومفيدة للمستخدم.",
  },
  {
    id: "how-it-works",
    question: "كيف يعمل كرومي؟",
    answer:
      "يلتقط المستخدم صورة للورقة أو يرفعها، ثم يستخدم كرومي الذكاء الاصطناعي لتحليلها وتحديد الحالة وتقديم معلومات تساعد على اتخاذ القرار الصحيح.",
  },
  {
    id: "what-it-offers",
    question: "ماذا يقدم كرومي للمستخدم؟",
    answer:
      "يمنحك نتيجة مفهومة ومعرفة عملية تساعدك على فهم الحالة، متابعة خطوات التعامل معها، وحماية نباتاتك وتحسين جودة الإنتاج.",
  },
  {
    id: "is-it-easy",
    question: "هل التطبيق سهل الاستخدام؟",
    answer:
      "نعم، صُمم كرومي ليجمع بين السرعة والبساطة حتى تكون عملية التشخيص أقرب وأوضح وأكثر عملية للجميع.",
  },
  {
    id: "what-makes-it-special",
    question: "ما الذي يميز كرومي؟",
    answer:
      "يميز كرومي قدرته على تقديم تقنية متقدمة بأسلوب بسيط ونتائج واضحة في الوقت المناسب، ليكون معك في كل خطوة.",
  },
] as const;

type AccordionItemProps = {
  question: string;
  answer: string;
  expanded: boolean;
  onPress: () => void;
  sx: (value: number) => number;
  sy: (value: number) => number;
};

function AccordionItem({
  question,
  answer,
  expanded,
  onPress,
  sx,
  sy,
}: AccordionItemProps) {
  return (
    <Animated.View
      layout={LinearTransition.duration(220)}
      style={[
        styles.accordionItem,
        {
          width: sx(270),
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={onPress}
        style={[
          styles.questionRow,
          {
            minHeight: sy(56),
            paddingVertical: sy(14),
            paddingHorizontal: sx(8),
          },
        ]}
      >
        <Text
          style={[
            styles.questionText,
            {
              fontSize: sx(18),
              lineHeight: sy(22),
              marginRight: sx(16),
            },
          ]}
        >
          {question}
        </Text>
        <Text
          style={[
            styles.toggleIcon,
            {
              fontSize: sx(32),
              lineHeight: sy(24),
            },
          ]}
        >
          {expanded ? "−" : "+"}
        </Text>
      </Pressable>

      {expanded ? (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={[
            styles.answerContainer,
            {
              paddingHorizontal: sx(8),
              paddingBottom: sy(18),
              paddingTop: sy(4),
            },
          ]}
        >
          <Text
            style={[
              styles.answerText,
              {
                fontSize: sx(14),
                lineHeight: sy(23),
              },
            ]}
          >
            {answer}
          </Text>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

export default function AboutKoromiRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const handleToggleItem = (itemId: string) => {
    setExpandedItemId((currentItemId) => (currentItemId === itemId ? null : itemId));
  };

  return (
    <AppScreenBackground
      backgroundUri={infoAssets.aboutKoromi.bg}
      backgroundColor={colors.surfaceBackground}
      backgroundStyle={{
        width: sx(393),
        height: sy(852),
      }}
    >
      <AppTopBar
        sx={sx}
        sy={sy}
        logoUri={infoAssets.aboutKoromi.logo}
        profileUri={infoAssets.aboutKoromi.profile}
        menuUri={infoAssets.aboutKoromi.menu}
        onMenuPress={() => setIsSidebarVisible(true)}
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={128}
        width={345}
        height={600}
        borderRadius={45}
      >
        <BackButton
          iconUri={infoAssets.aboutKoromi.arrow}
          sx={sx}
          sy={sy}
          top={17}
          right={24}
          fallbackRoute={ROUTES.home}
        />

        <Text style={[styles.title, { marginTop: sy(20), fontSize: sx(20) }]}>عن كرومي</Text>

        <Image
          source={{ uri: faqIllustrationUri }}
          style={{
            position: "absolute",
            alignSelf: "center",
            top: sy(52),
            width: sx(148),
            height: sy(114),
          }}
          resizeMode="contain"
        />

        <ScrollView
          style={{
            position: "absolute",
            top: sy(183),
            left: sx(24),
            width: sx(270),
            maxHeight: sy(395),
          }}
          contentContainerStyle={{
            paddingBottom: sy(12),
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {aboutFaqItems.map((item) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              expanded={expandedItemId === item.id}
              onPress={() => handleToggleItem(item.id)}
              sx={sx}
              sy={sy}
            />
          ))}
        </ScrollView>
      </ContentCard>

      <Pressable
        onPress={() => router.push(ROUTES.team)}
        style={{
          position: "absolute",
          top: sy(738),
          alignSelf: "center",
          width: sx(304),
          alignItems: "center",
        }}
      >
        <Text style={[styles.teamLink, { fontSize: sx(16), lineHeight: sy(19) }]}>فريقنا</Text>
      </Pressable>

      <AppBottomNav
        sx={sx}
        sy={sy}
        active={null}
        icons={{
          settings: infoAssets.aboutKoromi.navSettings,
          history: infoAssets.aboutKoromi.navHistory,
          home: infoAssets.aboutKoromi.navHome,
        }}
      />

      <AppSidebar
        visible={isSidebarVisible}
        sx={sx}
        sy={sy}
        currentItem="about"
        onClose={() => setIsSidebarVisible(false)}
      />
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  accordionItem: {
    borderTopWidth: 0.75,
    borderBottomWidth: 0.75,
    borderColor: "#CDCDCD",
    backgroundColor: "transparent",
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionText: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  toggleIcon: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    minWidth: 24,
  },
  answerContainer: {
    backgroundColor: "transparent",
  },
  answerText: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  teamLink: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
    textDecorationLine: "underline",
  },
});
