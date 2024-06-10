import React from "react";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/signin"} />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="carpool"
        options={{
          title: "Carpool",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="car" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Today's Menu",
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="fast-food" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
