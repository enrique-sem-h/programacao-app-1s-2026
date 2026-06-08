import { Stack } from "expo-router";

export default function layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerBackButtonDisplayMode: "generic",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login/index" options={{ headerTitle: "" }} />
      <Stack.Screen name="register/index" />
    </Stack>
  );
}
