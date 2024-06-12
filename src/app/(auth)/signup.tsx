import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.log(error);
      Alert.alert(error.message);
    } else {
      const profileError = await createProfile(data.user);

      if (profileError) {
        Alert.alert(profileError.message);
      } else {
        router.push("/(main)/carpool");
      }
    }
    setLoading(false);
  }

  async function createProfile(user: User) {
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
    });

    return error;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />
      <View style={styles.nameContainer}>
        <View style={styles.nameInput}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
        </View>

        <View style={styles.nameInput}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
        </View>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Creating account..." : "Create account"}
      />
      <Link href="/signin" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  nameInput: {
    // width: "50%",
    flex: 1,
  },
});

export default SignUpScreen;
