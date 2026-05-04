import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function MyRentals() {
  const router = useRouter();
  const rentals = [1, 2, 3]; // mudar dps

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Meus aluguéis" }} />

      <FlatList
        data={rentals}
        numColumns={2}
        renderItem={() => (
          <View style={styles.card}>
            <View style={styles.imagePlaceholder}>
               <Ionicons name="cart-outline" size={40} color="#ccc" />
            </View>
            <Text style={styles.itemTitle}>Item Alugado</Text>
            <TouchableOpacity 
              style={styles.ratingButton}
              onPress={() => router.push("/rating")} 
            >
              <Text style={styles.ratingText}>Avaliar</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flex: 1, margin: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, backgroundColor: "#fff" },
  imagePlaceholder: { height: 100, backgroundColor: "#f9f9f9", marginBottom: 10, justifyContent: 'center', alignItems: 'center' },
  itemTitle: { fontWeight: "bold", marginBottom: 8, textAlign: 'center' },
  ratingButton: { backgroundColor: "#007AFF", padding: 8, borderRadius: 5, alignItems: "center" },
  ratingText: { color: "#fff", fontSize: 12, fontWeight: "bold" }
});