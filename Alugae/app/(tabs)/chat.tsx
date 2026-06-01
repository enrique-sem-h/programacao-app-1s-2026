import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { db } from "@/firebaseConfig"; 

import { collection, onSnapshot, query } from "firebase/firestore";

export default function ListaChats() {
  const router = useRouter();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "chats"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaChats: any[] = [];
      querySnapshot.forEach((doc) => {
        listaChats.push({
          id: doc.id, 
          ...doc.data()
        });
      });
      setChats(listaChats);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar lista de chats: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderChat = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        router.push({
          pathname: "/chatDetails",
          params: { chatId: item.id, userName: item.name },
        })
      }
    >
      <View style={styles.avatar} />
      <View style={styles.chatInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.userName}>{item.name || "Conversa Sem Nome"}</Text>
          <Text style={styles.time}>{item.time || ""}</Text>
        </View>
        <Text style={styles.lastMsg} numberOfLines={1}>
          {item.lastMsg || "Nenhuma mensagem ainda..."}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
          </View>
        ) : (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={renderChat}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhuma conversa iniciada ainda.</Text>
            }
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  emptyText: { textAlign: "center", marginTop: 40, color: "#888" },
});