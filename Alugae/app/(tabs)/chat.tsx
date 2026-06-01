import React from "react";
import { StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const CHATS = [
  {
    id: "1",
    name: "Mariana (Furadeira Bosch)",
    lastMsg: "Olá",
    time: "10:30",
    image: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    name: "Enrique (Câmera Canon)",
    lastMsg: "Obrigada!",
    time: "Ontem",
    image: "https://via.placeholder.com/50",
  },
]; // trocar dps pelos dados do banco

export default function ListaChats() {
  const router = useRouter();

  const renderChat = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push("/chatDetails")}
    >
      <View style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.lastMsg} numberOfLines={1}>
          {item.lastMsg}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={CHATS}
          keyExtractor={(item) => item.id}
          renderItem={renderChat}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
  pageTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  chatItem: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    backgroundColor: "transparent",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginRight: 15,
  },
  chatInfo: { flex: 1, backgroundColor: "transparent" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    backgroundColor: "transparent",
  },
  userName: { fontSize: 16, fontWeight: "600" },
  time: { fontSize: 12, color: "#888" },
  lastMsg: { fontSize: 14, color: "#666" },
});
