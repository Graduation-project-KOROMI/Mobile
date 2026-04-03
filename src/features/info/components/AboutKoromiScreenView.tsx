import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

import { PrimaryButton } from "@/src/components/controls/PrimaryButton";
import { AppScreenBackground } from "@/src/components/layout/AppScreenBackground";
import { AppTopBar } from "@/src/components/layout/AppTopBar";
import { ContentCard } from "@/src/components/layout/ContentCard";
import { AppBottomNav } from "@/src/components/navigation/AppBottomNav";
import { BackButton } from "@/src/components/navigation/BackButton";
import { infoAssets } from "@/src/constants/assets";
import type { AboutFaqItem } from "@/src/features/info/data/aboutFaqItems";
import type { FaqAccordionController } from "@/src/features/info/hooks/useFaqAccordion";
import { ROUTES } from "@/src/navigation/routes";
import type { ScaleFn } from "@/src/shared/types/scale";
import { colors } from "@/src/theme/colors";

type AccordionItemProps = {
  itemId: string;
  question: string;
  answer: string;
  expanded: boolean;
  onPress: () => void;
  onMeasure: (itemId: string, y: number, height: number) => void;
  sx: ScaleFn;
  sy: ScaleFn;
};

type AboutKoromiScreenViewProps = {
  sx: ScaleFn;
  sy: ScaleFn;
  accordion: FaqAccordionController;
  faqItems: AboutFaqItem[];
  onTeamPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

export function AboutKoromiScreenView({
  sx,
  sy,
  accordion,
  faqItems,
  onTeamPress,
}: AboutKoromiScreenViewProps) {
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
              {faqItems.length} أسئلة
            </Text>
          </View>

          <ScrollView
            ref={accordion.faqScrollViewRef}
            style={{ flex: 1, marginTop: sy(10) }}
            contentContainerStyle={{
              paddingBottom: sy(6),
              gap: sy(10),
            }}
            onLayout={accordion.handleScrollViewLayout}
            onScroll={accordion.handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                itemId={item.id}
                question={item.question}
                answer={item.answer}
                expanded={accordion.expandedItemId === item.id}
                onPress={() => accordion.handleToggleItem(item.id)}
                onMeasure={accordion.handleAccordionMeasure}
                sx={sx}
                sy={sy}
              />
            ))}
          </ScrollView>

          <PrimaryButton
            label="تعرف على فريقنا"
            onPress={onTeamPress}
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
