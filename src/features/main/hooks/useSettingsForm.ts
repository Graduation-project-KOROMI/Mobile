import { useState } from "react";

import { getDefaultSettingsFormState } from "@/src/services/settings/settingsService";

export function useSettingsForm() {
  const defaults = getDefaultSettingsFormState();

  const [firstName, setFirstName] = useState(defaults.firstName);
  const [lastName, setLastName] = useState(defaults.lastName);
  const [email] = useState(defaults.email);
  const [oldPassword, setOldPassword] = useState(defaults.oldPassword);
  const [newPassword, setNewPassword] = useState(defaults.newPassword);

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
  };
}

export type SettingsFormController = ReturnType<typeof useSettingsForm>;
