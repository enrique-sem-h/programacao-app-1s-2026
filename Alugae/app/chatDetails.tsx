import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { db } from "@/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ChatDetails() {
  const router = useRouter();
  const { chatId, userName } = useLocalSearchParams();
  const { user, token } = useAuth();

  const meuId = user?.id ?? "anonimo";

  const [msg, setMsg] = useState("");
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!chatId || !meuId) return;

    async function verificarEAtivar() {
      try {
        const chatRef = doc(db, "chats", chatId as string);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
          const chatData = chatSnap.data();
          if (chatData.locadorId === meuId && chatData.aluguelId) {
            await fetch(`${API_URL}/alugueis/${chatData.aluguelId}/status`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ status: "ativo" }),
            });
          }
        }
      } catch (error) {
        console.error("Erro ao ativar aluguel:", error);
      }
    }

    verificarEAtivar();

    const q = query(
      collection(db, "chats", chatId as string, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: any[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMensagens(msgs);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao escutar mensagens: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  const enviar = async () => {
    if (!msg.trim() || !chatId) return;

    const textoMensagem = msg.trim();
    setMsg("");

    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
      hour: "2-digit", minute: "2-digit",
    });

    try {
      await addDoc(collection(db, "chats", chatId as string, "messages"), {
        texto: textoMensagem,
        senderId: meuId,
        senderNome: user?.nome ?? "Usuário",
        createdAt: serverTimestamp(),
      });

      const chatRef = doc(db, "chats", chatId as string);
      await updateDoc(chatRef, {
        lastMsg: textoMensagem,
        time: horaFormatada,
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen
        options={{
          title: (userName as string) || "Chat",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/chat")} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const ehMinha = item.senderId === meuId;
            return (
              <View style={[styles.balao, ehMinha ? styles.balaoEu : styles.balaoOutro]}>
                {!ehMinha && (
                  <Text style={styles.senderNome}>{item.senderNome}</Text>
                )}
                <Text style={{ color: ehMinha ? "#fff" : "#000" }}>{item.texto}</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.lista}
        />
      )}

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#888"
          value={msg}
          onChangeText={setMsg}
        />
        <TouchableOpacity style={styles.btnEnviar} onPress={enviar}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  lista: { padding: 20 },
  balao: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: "80%" },
  balaoEu: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  balaoOutro: { alignSelf: "flex-start", backgroundColor: "#E9E9EB" },
  senderNome: { fontSize: 11, color: "#888", marginBottom: 3 },
  inputArea: {
    flexDirection: "row", padding: 15, alignItems: "center",
    borderTopWidth: 0.5, borderTopColor: "#ccc", backgroundColor: "#fff",
  },
  input: {
    flex: 1, height: 40, backgroundColor: "#f0f0f0",
    borderRadius: 20, paddingHorizontal: 15, marginRight: 10, color: "#000",
  },
  btnEnviar: {
    backgroundColor: "#007AFF", width: 40, height: 40,
    borderRadius: 20, justifyContent: "center", alignItems: "center",
  },
});