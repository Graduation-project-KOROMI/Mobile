import { SettingsScreenView } from "@/src/features/main/components/SettingsScreenView";
import { useSettingsForm } from "@/src/features/main/hooks/useSettingsForm";
import { useResponsiveScale } from "@/src/hooks/useResponsiveScale";

export function SettingsScreen() {
  const { sx, sy } = useResponsiveScale();
  const form = useSettingsForm();

  return <SettingsScreenView sx={sx} sy={sy} form={form} />;
}
