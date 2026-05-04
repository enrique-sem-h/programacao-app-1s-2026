import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EditAd() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Editar anúncio" }} />

      <View style={styles.imageUpload}>
        <Ionicons name="camera-outline" size={30} color="#666" />
        <Text style={styles.uploadText}>Alterar foto do produto</Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Título do Anúncio</Text>
        <TextInput style={styles.input} placeholder="Ex: Furadeira Bosch 500W" />

        <Text style={styles.label}>Preço por dia (R$)</Text>
        <TextInput style={styles.input} placeholder="0,00" keyboardType="numeric" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Descreva o estado do objeto..." 
          multiline
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Excluir Anúncio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  imageUpload: { 
    height: 150, 
    backgroundColor: "#eee", 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 25
  },
  uploadText: { marginTop: 8, color: "#666", fontSize: 12 },
  inputSection: { backgroundColor: 'transparent' },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 8 },
  input: { 
    backgroundColor: "#f5f5f5", 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 20,
    fontSize: 15 
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: "#000", padding: 18, borderRadius: 10, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  deleteButton: { marginTop: 15, padding: 10, alignItems: "center" },
  deleteText: { color: "#FF3B30", fontWeight: "600" }
});