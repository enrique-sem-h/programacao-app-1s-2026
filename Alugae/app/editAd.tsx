import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function EditAd() {
  const router = useRouter();
  const { token } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [titulo, setTitulo] = useState("");
  const [valorDiario, setValorDiario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchAnuncio() {
      try {
        const response = await fetch(`${API_URL}/anuncios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();
        const anuncio = json.anuncio ?? json;
        setTitulo(anuncio.titulo);
        setValorDiario(String(anuncio.valorDiario));
        setDescricao(anuncio.descricao);
      } catch {
        Alert.alert("Erro", "Não foi possível carregar o anúncio.");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAnuncio();
  }, [id]);

  async function handleSave() {
    console.log("Salvando anúncio ID:", id);
    console.log("URL:", `${API_URL}/anuncios/${id}`);

    if (!titulo || !valorDiario || !descricao) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/anuncios/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, valorDiario: Number(valorDiario), descricao }),
      });

      console.log("Status:", response.status);

      if (response.ok) {
        Alert.alert("Sucesso", "Anúncio atualizado!");
        router.back();
      } else {
        const data = await response.json();
        Alert.alert("Erro", data.error ?? "Erro ao atualizar.");
      }
    } catch (error) {
      console.log("Erro detalhado:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Editar anúncio" }} />

      <View style={styles.inputSection}>
        <Text style={styles.label}>Título do Anúncio</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Furadeira Bosch 500W"
        />

        <Text style={styles.label}>Preço por dia (R$)</Text>
        <TextInput
          style={styles.input}
          value={valorDiario}
          onChangeText={setValorDiario}
          placeholder="0,00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descreva o estado do objeto..."
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, saving && { opacity: 0.6 }]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Salvar Alterações</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputSection: { backgroundColor: "transparent" },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 8 },
  input: { backgroundColor: "#f5f5f5", padding: 15, borderRadius: 8, marginBottom: 20, fontSize: 15 },
  textArea: { height: 100, textAlignVertical: "top" },
  saveButton: { backgroundColor: "#000", padding: 18, borderRadius: 10, alignItems: "center", marginBottom: 40 },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});