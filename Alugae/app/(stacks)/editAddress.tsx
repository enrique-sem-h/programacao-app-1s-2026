import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { API_URL } from "@/constants/constants";
import { useAuth } from "@/src/context/AuthContext";

export default function EditAddress() {
  const router = useRouter();
  const { user, token, update } = useAuth();
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");

  async function handleSave() {
    const formData = new FormData();

    formData.append("endereco", endereco + " " + complemento);

    const result = await fetch(`${API_URL}/user/${user?.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (result.ok) {
      update({ endereco: endereco + " " + complemento });
      Alert.alert("Sucesso", "Seu endereco foi atualizado com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
      return;
    }

    console.log(result.status);

    Alert.alert(
      "Erro",
      `houve um erro no servidor, verifique se o telefone está de acordo e tente novamente`,
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Endereço" }} />

      <Text style={styles.label}>Novo Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Águas Claras..."
        placeholderTextColor="#888"
        onChangeText={setEndereco}
      />

      <Text style={[styles.label, { marginTop: 20 }]}>Complemento</Text>
      <TextInput
        style={styles.input}
        placeholder="Apto, Bloco..."
        placeholderTextColor="#888"
        onChangeText={setComplemento}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
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
