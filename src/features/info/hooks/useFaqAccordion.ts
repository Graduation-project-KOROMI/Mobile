import { useEffect, useRef, useState } from "react";
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
} from "react-native";

type ItemLayout = {
  y: number;
  height: number;
};

type ScrollMetrics = {
  viewportHeight: number;
  offsetY: number;
};

export function useFaqAccordion(sy: (value: number) => number) {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const faqScrollViewRef = useRef<ScrollView>(null);
  const faqItemLayoutsRef = useRef<Record<string, ItemLayout>>({});
  const faqScrollMetricsRef = useRef<ScrollMetrics>({
    viewportHeight: 0,
    offsetY: 0,
  });
  const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

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

  const handleAccordionMeasure = (
    itemId: string,
    y: number,
    height: number,
  ) => {
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

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    faqScrollMetricsRef.current.viewportHeight =
      event.nativeEvent.layout.height;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    faqScrollMetricsRef.current.offsetY = event.nativeEvent.contentOffset.y;
  };

  useEffect(() => {
    return () => {
      clearAutoScrollTimeout();
    };
  }, []);

  return {
    expandedItemId,
    faqScrollViewRef,
    handleAccordionMeasure,
    handleToggleItem,
    handleScrollViewLayout,
    handleScroll,
  };
}

export type FaqAccordionController = ReturnType<typeof useFaqAccordion>;
