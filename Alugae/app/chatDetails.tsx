import React, { useState } from "react";
import { StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router"; 

export default function ChatDetails() {
  const router = useRouter(); 
  const [msg, setMsg] = useState("");
  
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: "Olá", eu: false },
    { id: '2', texto: "Oi", eu: true },
  ]); // mudar dps

  const enviar = () => {
    if (!msg.trim()) return;
    setMensagens([...mensagens, { id: Date.now().toString(), texto: msg, eu: true }]);
    setMsg("");
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen 
        options={{ 
          title: "Chat", 
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/chat")} style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }} 
      />

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.balao, item.eu ? styles.balaoEu : styles.balaoOutro]}>
            <Text style={{ color: item.eu ? "#fff" : "#000" }}>{item.texto}</Text>
          </View>
        )}
        contentContainerStyle={styles.lista}
      />

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
  container: { flex: 1 },
  lista: { padding: 20 },
  balao: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: "80%" },
  balaoEu: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  balaoOutro: { alignSelf: "flex-start", backgroundColor: "#E9E9EB" },
  inputArea: { flexDirection: "row", padding: 15, alignItems: "center", borderTopWidth: 0.5, borderTopColor: "#ccc" },
  input: { flex: 1, height: 40, backgroundColor: "#f0f0f0", borderRadius: 20, paddingHorizontal: 15, marginRight: 10, color: "#000" },
  btnEnviar: { backgroundColor: "#007AFF", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
});