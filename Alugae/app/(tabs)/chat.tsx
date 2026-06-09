import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "@/src/context/AuthContext";

export default function ListaChats() {
  const router = useRouter();
  const { user } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const q = query(
      collection(db, "chats"),
      where("participantes", "array-contains", user.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const listaChats: any[] = [];
      querySnapshot.forEach((doc) => {
        listaChats.push({ id: doc.id, ...doc.data() });
      });
      setChats(listaChats);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar lista de chats: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id]);

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
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => router.push({
                  pathname: "/chatDetails",
                  params: { chatId: item.id, userName: item.name },
                })}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name?.charAt(0).toUpperCase() ?? "C"}
                  </Text>
                </View>
                <View style={styles.chatInfo}>
                  <View style={styles.headerRow}>
                    <Text style={styles.userName}>{item.name || "Conversa"}</Text>
                    <Text style={styles.time}>{item.time || ""}</Text>
                  </View>
                  <Text style={styles.lastMsg} numberOfLines={1}>
                    {item.lastMsg || "Nenhuma mensagem ainda..."}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>Nenhuma conversa iniciada ainda.</Text>
                <Text style={styles.emptySubText}>Faça um aluguel para iniciar um chat!</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: "white" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  chatItem: {
    flexDirection: "row", paddingVertical: 15,
    borderBottomWidth: 0.5, borderBottomColor: "#ccc", backgroundColor: "transparent",
  },
  avatar: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: "#007AFF", marginRight: 15,
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  chatInfo: { flex: 1, backgroundColor: "transparent" },
  headerRow: {
    flexDirection: "row", justifyContent: "space-between",
    marginBottom: 5, backgroundColor: "transparent",
  },
  userName: { fontSize: 16, fontWeight: "600" },
  time: { fontSize: 12, color: "#888" },
  lastMsg: { fontSize: 14, color: "#666" },
  empty: { alignItems: "center", marginTop: 60 },
  emptyText: { color: "#888", fontSize: 16, textAlign: "center" },
  emptySubText: { color: "#bbb", fontSize: 13, marginTop: 8, textAlign: "center" },
});