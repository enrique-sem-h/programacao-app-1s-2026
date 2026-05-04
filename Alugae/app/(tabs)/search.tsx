import React from "react";
import { StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Search() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
        <TextInput 
          placeholder="O que você está procurando?" 
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <TouchableOpacity 
            style={styles.resultItem}
            onPress={() => router.push("/adDetails")}
          >
            <View style={styles.resultImage}>
              <Ionicons name="image-outline" size={30} color="#ccc" />
            </View>
            <View style={styles.resultInfo}>
              <View style={styles.infoLine} />
              <View style={[styles.infoLine, { width: '80%' }]} />
              <View style={[styles.infoLine, { width: '40%', backgroundColor: '#007AFF' }]} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#f0f0f0", borderRadius: 10, paddingHorizontal: 15, height: 50, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 16, color: "#000" },
  resultItem: { flexDirection: "row", marginBottom: 20, backgroundColor: 'transparent' },
  resultImage: { width: 100, height: 100, backgroundColor: "#eee", borderRadius: 8, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  resultInfo: { flex: 1, justifyContent: "center", backgroundColor: 'transparent' },
  infoLine: { height: 12, backgroundColor: "#f0f0f0", borderRadius: 6, marginBottom: 10 }
});