import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="plan-trip" />
      <Stack.Screen name="results" />
      <Stack.Screen name="trip-details" />
    </Stack>
  );
}
