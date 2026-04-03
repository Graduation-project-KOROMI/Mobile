import type { SettingsFormState } from "@/src/shared/types/settings";

const defaultSettingsFormState: SettingsFormState = {
  firstName: "محمد",
  lastName: "ابو حسن",
  email: "mabuhasan001@gmail.com",
  oldPassword: "",
  newPassword: "",
};

export function getDefaultSettingsFormState(): SettingsFormState {
  return {
    ...defaultSettingsFormState,
  };
}
