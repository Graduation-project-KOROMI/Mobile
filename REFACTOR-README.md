# Refactor Implementation Report

## Objective

The codebase was refactored to reduce complexity and improve maintainability while preserving UI, styles, layout, spacing, and user behavior.

## New Structure

```text
src/
   app/
      layouts/
         RootLayoutShell.tsx
   features/
      auth/
         screens/
      main/
         components/
         hooks/
         screens/
      diagnosis/
         components/
         data/
         hooks/
         screens/
      info/
         components/
         data/
         hooks/
         screens/
   shared/
      types/
   navigation/
      routes.ts
      menu.ts
   services/
      api/
      diagnosis/
      history/
      settings/
```

## Key Refactors (Before -> After)

### 1. Route files became thin wrappers

Before:

```tsx
// app/(main)/home.tsx
// Full UI + state + navigation logic in route file
```

After:

```tsx
// app/(main)/home.tsx
import { HomeScreen } from "@/src/features/main/screens/HomeScreen";

export default function HomeRoute() {
  return <HomeScreen />;
}
```

### 2. Screen logic extracted into hooks

Before:

```tsx
// app/(main)/settings.tsx
const [firstName, setFirstName] = useState("محمد");
const [lastName, setLastName] = useState("ابو حسن");
const [oldPassword, setOldPassword] = useState("");
```

After:

```tsx
// src/features/main/hooks/useSettingsForm.ts
export function useSettingsForm() {
  const defaults = getDefaultSettingsFormState();
  const [firstName, setFirstName] = useState(defaults.firstName);
  const [lastName, setLastName] = useState(defaults.lastName);
  const [oldPassword, setOldPassword] = useState(defaults.oldPassword);
  // ...
}
```

### 3. Container/presentational split for large screens

Applied to:

- `home`
- `settings`
- `history`
- `processing`
- `about-koromi`

Pattern:

```tsx
// Container
export function HomeScreen() {
   const { sx, sy } = useResponsiveScale();
   const sidebar = useHomeSidebar();
   return <HomeScreenView sx={sx} sy={sy} ... />;
}

// Presentational
export function HomeScreenView(props) {
   return <AppScreenBackground>{/* unchanged JSX/UI */}</AppScreenBackground>;
}
```

### 4. Navigation centralized

Before:

- Route constants and nav mappings were under `src/constants/routes.ts`
- Sidebar and bottom-nav item definitions were duplicated in components

After:

- `src/navigation/routes.ts` is the single route source
- `src/navigation/menu.ts` holds menu metadata
- Components consume centralized config (`AppBottomNav`, `AppSidebar`, `BackButton`)

### 5. Static screen data moved out of UI files

Before:

- Mock history, FAQ items, team members, diagnosis copy lived inside route components

After:

- `src/services/history/historyService.ts`
- `src/features/info/data/aboutFaqItems.ts`
- `src/features/info/data/teamMembers.ts`
- `src/features/diagnosis/data/diagnosisCopy.ts`

## What Was Removed and Why

1. Redundant group layouts:
   - `app/(auth)/_layout.tsx`
   - `app/(main)/_layout.tsx`
   - `app/(diagnosis)/_layout.tsx`
   - `app/(info)/_layout.tsx`

   These files duplicated the same stack config and added unnecessary nesting.

2. Repeated inline type aliases:
   - Shared types were moved to `src/shared/types/*` (for example `scale.ts`, `history.ts`, `team.ts`, `settings.ts`).

3. Mixed responsibilities in route files:
   - Route files now delegate to feature screens.
   - Complex UI logic moved to hooks and feature containers.

## Behavior and UI Parity

- Route paths remain unchanged.
- UI components, style values, and rendered structure are preserved.
- Navigation behavior is preserved while configuration is centralized.
- No visual or UX changes were introduced intentionally.
