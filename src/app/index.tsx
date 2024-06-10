import { View, Text, ActivityIndicator, Alert } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect, useRouter } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error signing out");
    } else {
      router.replace("/signin");
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/signin"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={handleSignOut} text="Sign out" />
    </View>
  );
};

export default index;
