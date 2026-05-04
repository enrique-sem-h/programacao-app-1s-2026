import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";

export default function AddCard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Cadastrar cartão" }} />
      <Text style={styles.sectionTitle}>Adicionar cartão</Text>

      <TextInput style={styles.input} placeholder="Número do cartão" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Nome impresso" placeholderTextColor="#888" />
      
      <View style={{ flexDirection: 'row', gap: 10, backgroundColor: 'transparent' }}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="Validade (MM/AA)" placeholderTextColor="#888" />
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="CVV" placeholderTextColor="#888" />
      </View>

      <TouchableOpacity style={styles.mainButton} onPress={() => router.back()}>
        <Text style={styles.mainButtonText}>Salvar cartão</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: { backgroundColor: '#E5E5E5', padding: 15, borderRadius: 12, color: '#000', height: 55, marginBottom: 15 },
  mainButton: { backgroundColor: '#000', padding: 18, borderRadius: 12, marginTop: 10, alignItems: 'center' },
  mainButtonText: { color: '#fff', fontWeight: 'bold' }
});