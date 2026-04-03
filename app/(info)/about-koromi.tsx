import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { infoAssets } from "@/src/constants/assets";
import { ROUTES } from "@/src/constants/routes";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";
import { colors } from "@/src/theme/colors";

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
      "تلتقط صورة للورقة أو ترفعها، ثم يستخدم كرومي الذكاء الاصطناعي لتحليلها وتحديد الحالة وتقديم معلومات تساعدك على اتخاذ القرار الصحيح.",
  },
  {
    id: "what-it-offers",
    question: "ماذا يقدم كرومي للمستخدم؟",
    answer:
      "يمنحك نتيجة مفهومة وخطوات عملية تساعدك على فهم الحالة، متابعة طريقة التعامل معها، وحماية نباتاتك وتحسين جودة الإنتاج.",
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
  itemId: string;
  question: string;
  answer: string;
  expanded: boolean;
  onPress: () => void;
  onMeasure: (itemId: string, y: number, height: number) => void;
  sx: (value: number) => number;
  sy: (value: number) => number;
};

function AccordionItem({
  itemId,
  question,
  answer,
  expanded,
  onPress,
  onMeasure,
  sx,
  sy,
}: AccordionItemProps) {
  return (
    <Animated.View
      layout={LinearTransition.duration(220)}
      onLayout={(event) => {
        const { y, height } = event.nativeEvent.layout;
        onMeasure(itemId, y, height);
      }}
      style={[
        styles.accordionItem,
        {
          borderRadius: sx(20),
          paddingHorizontal: sx(14),
          paddingVertical: sy(12),
        },
        expanded ? styles.accordionItemExpanded : null,
      ]}
    >
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={onPress}
        style={styles.questionRow}
      >
        <View
          style={[
            styles.toggleChip,
            {
              width: sx(32),
              height: sy(32),
              borderRadius: sx(16),
            },
            expanded ? styles.toggleChipExpanded : null,
          ]}
        >
          <Text
            style={[
              styles.toggleIcon,
              {
                fontSize: sx(22),
                lineHeight: sy(22),
              },
              expanded ? styles.toggleIconExpanded : null,
            ]}
          >
            {expanded ? "−" : "+"}
          </Text>
        </View>

        <Text
          style={[
            styles.questionText,
            {
              marginRight: sx(12),
              fontSize: sx(16),
              lineHeight: sy(21),
            },
          ]}
        >
          {question}
        </Text>
      </AnimatedPressable>

      {expanded ? (
        <Animated.View
          entering={FadeIn.duration(180)}
          exiting={FadeOut.duration(120)}
          style={[
            styles.answerContainer,
            {
              marginTop: sy(12),
              paddingTop: sy(12),
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AboutKoromiRoute() {
  const router = useRouter();
  const { sx, sy } = useResponsiveScale();
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const faqScrollViewRef = useRef<ScrollView>(null);
  const faqItemLayoutsRef = useRef<Record<string, { y: number; height: number }>>({});
  const faqScrollMetricsRef = useRef({
    viewportHeight: 0,
    offsetY: 0,
  });
  const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAutoScrollTimeout = () => {
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }
  };

  const scrollItemIntoView = (itemId: string) => {
    clearAutoScrollTimeout();
    autoScrollTimeoutRef.current = setTimeout(() => {
      const layout = faqItemLayoutsRef.current[itemId];
      const { viewportHeight, offsetY } = faqScrollMetricsRef.current;

      if (!layout || viewportHeight <= 0) {
        return;
      }

      const topPadding = sy(8);
      const bottomPadding = sy(12);
      const itemTop = layout.y;
      const itemBottom = layout.y + layout.height;
      const viewportBottom = offsetY + viewportHeight;
      let nextOffset = offsetY;

      if (itemBottom + bottomPadding > viewportBottom) {
        nextOffset = itemBottom - viewportHeight + bottomPadding;
      }

      if (itemTop - topPadding < nextOffset) {
        nextOffset = Math.max(0, itemTop - topPadding);
      }

      if (Math.abs(nextOffset - offsetY) > 1) {
        faqScrollViewRef.current?.scrollTo({
          y: nextOffset,
          animated: true,
        });
      }
    }, 260);
  };

  const handleAccordionMeasure = (itemId: string, y: number, height: number) => {
    faqItemLayoutsRef.current[itemId] = { y, height };

    if (expandedItemId === itemId) {
      scrollItemIntoView(itemId);
    }
  };

  const handleToggleItem = (itemId: string) => {
    setExpandedItemId((currentItemId) => {
      const nextItemId = currentItemId === itemId ? null : itemId;

      if (nextItemId) {
        scrollItemIntoView(nextItemId);
      } else {
        clearAutoScrollTimeout();
      }

      return nextItemId;
    });
  };

  useEffect(() => clearAutoScrollTimeout, []);

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
        sidebarCurrentItem="about"
      />

      <ContentCard
        sx={sx}
        sy={sy}
        top={118}
        width={345}
        bottom={88}
        borderRadius={42}
        style={{
          paddingTop: sy(20),
          paddingHorizontal: sx(18),
          paddingBottom: sy(14),
        }}
      >
        <BackButton
          iconUri={infoAssets.aboutKoromi.arrow}
          sx={sx}
          sy={sy}
          top={18}
          right={22}
          fallbackRoute={ROUTES.home}
        />

        <View style={styles.cardContent}>
          <Text style={[styles.title, { fontSize: sx(20), lineHeight: sy(24) }]}>عن كرومي</Text>

          <View
            style={[
              styles.heroCard,
              {
                marginTop: sy(14),
                borderRadius: sx(24),
                paddingHorizontal: sx(14),
                paddingVertical: sy(12),
              },
            ]}
          >
            <Image
              source={{ uri: infoAssets.aboutKoromi.illustration }}
              style={{
                width: sx(76),
                height: sy(76),
              }}
              resizeMode="contain"
            />

            <View style={[styles.heroTextBlock, { marginRight: sx(12) }]}>
              <Text style={[styles.heroEyebrow, { fontSize: sx(12), lineHeight: sy(16) }]}>
                تشخيص أوضح
              </Text>
              <Text style={[styles.heroTitle, { fontSize: sx(18), lineHeight: sy(24) }]}>
                تجربة أسهل للعناية بكرومك
              </Text>
              <Text style={[styles.heroSubtitle, { fontSize: sx(12), lineHeight: sy(18) }]}>
                يجمع كرومي بين سرعة التحليل ووضوح النتيجة ليمنحك فهماً أسرع لحالة النبات.
              </Text>
            </View>
          </View>

          <View style={[styles.sectionHeader, { marginTop: sy(14) }]}>
            <Text style={[styles.sectionTitle, { fontSize: sx(16), lineHeight: sy(20) }]}>
              الأسئلة الشائعة
            </Text>
            <Text style={[styles.sectionMeta, { fontSize: sx(12), lineHeight: sy(16) }]}>
              {aboutFaqItems.length} أسئلة
            </Text>
          </View>

          <ScrollView
            ref={faqScrollViewRef}
            style={{ flex: 1, marginTop: sy(10) }}
            contentContainerStyle={{
              paddingBottom: sy(6),
              gap: sy(10),
            }}
            onLayout={(event) => {
              faqScrollMetricsRef.current.viewportHeight = event.nativeEvent.layout.height;
            }}
            onScroll={(event) => {
              faqScrollMetricsRef.current.offsetY = event.nativeEvent.contentOffset.y;
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {aboutFaqItems.map((item) => (
              <AccordionItem
                key={item.id}
                itemId={item.id}
                question={item.question}
                answer={item.answer}
                expanded={expandedItemId === item.id}
                onPress={() => handleToggleItem(item.id)}
                onMeasure={handleAccordionMeasure}
                sx={sx}
                sy={sy}
              />
            ))}
          </ScrollView>

          <PrimaryButton
            label="تعرف على فريقنا"
            onPress={() => router.push(ROUTES.team)}
            style={{
              width: "100%",
              height: sy(52),
              borderRadius: sx(18),
              marginTop: sy(8),
            }}
            textStyle={{
              fontSize: sx(18),
              lineHeight: sy(22),
            }}
          />
        </View>
      </ContentCard>

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
    </AppScreenBackground>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  heroCard: {
    backgroundColor: "#F7FFF5",
    borderWidth: 1,
    borderColor: "#D9F3D2",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  heroTextBlock: {
    flex: 1,
    alignItems: "flex-end",
  },
  heroEyebrow: {
    color: colors.primary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  heroSubtitle: {
    color: colors.textMuted,
    fontFamily: "Tajawal_400Regular",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  sectionMeta: {
    color: colors.textMuted,
    fontFamily: "Tajawal_700Bold",
    textAlign: "left",
    includeFontPadding: false,
  },
  accordionItem: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1EFE0",
  },
  accordionItemExpanded: {
    backgroundColor: "#F8FFF6",
    borderColor: "#BDEAB6",
  },
  questionRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  questionText: {
    flex: 1,
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
  toggleChip: {
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleChipExpanded: {
    backgroundColor: colors.primary,
  },
  toggleIcon: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_700Bold",
    textAlign: "center",
    includeFontPadding: false,
  },
  toggleIconExpanded: {
    color: "#FFFFFF",
  },
  answerContainer: {
    borderTopWidth: 1,
    borderTopColor: "#DCEED8",
  },
  answerText: {
    color: colors.textPrimary,
    fontFamily: "Tajawal_400Regular",
    textAlign: "right",
    writingDirection: "rtl",
    includeFontPadding: false,
  },
});
