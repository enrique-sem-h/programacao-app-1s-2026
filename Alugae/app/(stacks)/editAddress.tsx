import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";

export default function EditAddress() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Endereço" }} />
      
      <Text style={styles.label}>Novo Endereço</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ex: Águas Claras..." 
        placeholderTextColor="#888" 
      />

      <Text style={[styles.label, { marginTop: 20 }]}>Complemento</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Apto, Bloco..." 
        placeholderTextColor="#888" 
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#E5E5E5', padding: 15, borderRadius: 12, color: '#000', height: 55 },
  saveButton: { backgroundColor: '#000', padding: 18, borderRadius: 12, marginTop: 40, alignItems: 'center', alignSelf: 'center', width: 140 },
  saveText: { color: '#fff', fontWeight: 'bold' }
});