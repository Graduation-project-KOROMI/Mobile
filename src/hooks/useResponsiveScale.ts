import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export function useResponsiveScale() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const scaleX = width / BASE_WIDTH;
    const scaleY = height / BASE_HEIGHT;

    return {
      width,
      height,
      sx: (value: number) => value * scaleX,
      sy: (value: number) => value * scaleY,
    };
  }, [height, width]);
}
