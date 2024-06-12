import { ActivityIndicator, StyleSheet } from "react-native";

import { useProfile } from "@/api/profiles";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@/providers/AuthProvider";

export default function TabTwoScreen() {
  const { data, error, isLoading } = useProfile();
  const { session } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Text style={styles.title}>Profile Information</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>
        {data.first_name} {data.last_name}
      </Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{session?.user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",

    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    color: "lightgray",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray",
    marginBottom: 10,
  },
});
