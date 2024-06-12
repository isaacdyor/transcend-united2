import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  TextInput,
} from "react-native";

import { useMenu } from "@/api/menus";
import Button from "@/components/Button";
import { Text, View } from "@/components/Themed";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

export default function MenuScreen() {
  const { data, error, isLoading } = useMenu();
  const [orderDetails, setOrderDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useAuth();
  const userId = session?.user.id;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const submitOrder = async () => {
    setLoading(true);
    const { error } = await supabase.from("orders").insert({
      details: orderDetails,
      user_id: userId,
      menu_id: data.id,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Order submitted");
      setOrderDetails("");
    }
    setLoading(false);
  };

  return (
    <View>
      {!data && <Text>No menu available</Text>}
      <Text style={styles.label}>Food:</Text>
      <Text style={styles.value}>{data.food}</Text>
      <Text style={styles.label}>Order Details:</Text>

      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        value={orderDetails}
        onChangeText={setOrderDetails}
        blurOnSubmit={true}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
      />

      <Button
        text={loading ? "Submitting order..." : "Order"}
        onPress={submitOrder}
      />
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
  textArea: {
    height: 100,
    width: "100%",
    padding: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top", // Align text at the top of the text area
    marginTop: 10,
  },
});
