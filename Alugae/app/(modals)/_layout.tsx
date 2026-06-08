import { Stack } from "expo-router";

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
      <Stack.Screen
        name="loginModal"
        options={{
          presentation: "formSheet",
          gestureEnabled: true,
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
