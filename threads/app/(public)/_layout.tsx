import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          title: "Welcome",
          headerShown: false,
        }}
      />
      {/* Add more public screens here as needed */}
    </Stack>
  );
}
