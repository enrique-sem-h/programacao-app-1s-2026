import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";

export default function EditCard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Editar cartão" }} />
      
      <Text style={styles.label}>Apelido do cartão</Text>
      <TextInput style={styles.input} placeholder="Ex: Cartão Principal" placeholderTextColor="#888" />

      <Text style={styles.label}>Número do cartão</Text>
      <View style={styles.lockedInput}>
        <Text style={styles.lockedText}>**** **** **** 4532</Text>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Text style={styles.label}>Validade</Text>
          <TextInput style={styles.input} placeholder="05/29" placeholderTextColor="#888" />
        </View>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Text style={styles.label}>CVV</Text>
          <TextInput style={styles.input} placeholder="***" placeholderTextColor="#888" secureTextEntry />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveText}>Salvar alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Excluir cartão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 8, marginTop: 15 },
  input: { backgroundColor: '#E5E5E5', padding: 15, borderRadius: 12, color: '#000', height: 55 },
  lockedInput: { backgroundColor: '#F2F2F2', padding: 15, borderRadius: 12, height: 55, justifyContent: 'center', borderWidth: 1, borderColor: '#DDD' },
  lockedText: { color: '#888' },
  row: { flexDirection: 'row', gap: 10, backgroundColor: 'transparent' },
  saveButton: { backgroundColor: '#000', padding: 18, borderRadius: 12, marginTop: 30, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: 'bold' },
  deleteButton: { marginTop: 20, alignItems: 'center', backgroundColor: 'transparent' },
  deleteText: { color: '#FF3B30', fontWeight: 'bold' }
});