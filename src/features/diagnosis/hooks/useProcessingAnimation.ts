import { useEffect, useMemo } from "react";
import {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

const DOT_COUNT = 28;
const MIN_RING_SIZE = 188;
const MAX_RING_SIZE = 240;

export type ProcessingDot = {
  index: number;
  size: number;
  opacity: number;
  left: number;
  top: number;
};

export function useProcessingAnimation(width: number, height: number) {
  const rotation = useSharedValue(0);

  const ringSize = useMemo(() => {
    const responsiveSize = width * 0.58;
    return Math.max(MIN_RING_SIZE, Math.min(responsiveSize, MAX_RING_SIZE));
  }, [width]);

  const ringRadius = ringSize * 0.44;
  const contentTopPadding = Math.max(
    Math.max(30, height * 0.045) +
      Math.max(50, Math.min(width * 0.16, 68)) +
      24,
    height * 0.24,
  );
  const titleWidth = Math.min(width * 0.84, 330);
  const headingTopGap = Math.max(22, height * 0.03);
  const leafContainerSize = ringSize * 0.78;
  const leafImageWidth = leafContainerSize * (400 / 168);
  const leafImageHeight = leafContainerSize * (267 / 168);
  const leafImageLeft = -leafContainerSize * (116 / 168);
  const leafImageTop = -leafContainerSize * (50 / 168);

  const dotItems = useMemo<ProcessingDot[]>(() => {
    const baseDotSize = Math.max(4.5, ringSize * 0.028);

    return Array.from({ length: DOT_COUNT }, (_, index) => {
      const angle = (2 * Math.PI * index) / DOT_COUNT - Math.PI / 2;
      const wave = (Math.sin(angle) + 1) / 2;
      const size = baseDotSize + wave * baseDotSize * 0.95;
      const opacity = 0.35 + wave * 0.55;

      return {
        index,
        size,
        opacity,
        left: ringSize / 2 + ringRadius * Math.cos(angle) - size / 2,
        top: ringSize / 2 + ringRadius * Math.sin(angle) - size / 2,
      };
    });
  }, [ringRadius, ringSize]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2500,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, [rotation]);

  const ringRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return {
    ringSize,
    contentTopPadding,
    titleWidth,
    headingTopGap,
    leafContainerSize,
    leafImageWidth,
    leafImageHeight,
    leafImageLeft,
    leafImageTop,
    dotItems,
    ringRotateStyle,
  };
}

export type ProcessingAnimationState = ReturnType<
  typeof useProcessingAnimation
>;
