import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { API_URL } from "@/constants/constants";
import { useAuth } from "@/src/context/AuthContext";

export default function EditEmail() {
  const router = useRouter();
  const { user, token, update } = useAuth();
  const [email, setEmail] = useState("");

  async function handleSave() {
    const formData = new FormData();

    formData.append("email", email);

    const result = await fetch(`${API_URL}/user/${user?.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (result.ok) {
      update({ email: email });
      Alert.alert("Sucesso", "Seu email foi atualizado com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back,
        },
      ]);
      return;
    }

    console.log(result.status);

    Alert.alert(
      "Erro",
      `houve um erro no servidor, verifique se o email está de acordo e tente novamente`,
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "E-mail" }} />

      <Text style={styles.label}>Novo e-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o novo e-mail"
        placeholderTextColor="#888"
        onChangeText={setEmail}
      />

      {/* <Text style={[styles.label, { marginTop: 20 }]}>Código enviado</Text>
      <View style={styles.row}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="0000" placeholderTextColor="#888" keyboardType="numeric" />
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Reenviar Código</Text>
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 13, fontWeight: "bold", marginBottom: 8 },
  input: {
    backgroundColor: "#E5E5E5",
    padding: 15,
    borderRadius: 12,
    color: "#000",
    height: 55,
  },
  row: { flexDirection: "row", gap: 10, backgroundColor: "transparent" },
  resendButton: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 12,
  },
  resendText: { color: "#000", fontSize: 12, fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 12,
    marginTop: 40,
    alignItems: "center",
    alignSelf: "center",
    width: 140,
  },
  saveText: { color: "#fff", fontWeight: "bold" },
});
