import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";

export default function EditPassword() {
  const router = useRouter();

  const PasswordField = ({ label }: { label: string }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.input} 
        secureTextEntry 
        placeholder="******" 
        placeholderTextColor="#888" 
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Alterar Senha" }} />
      
      <PasswordField label="Senha atual" />
      <PasswordField label="Nova senha" />
      <PasswordField label="Confirmar nova senha" />

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputGroup: { marginBottom: 20, backgroundColor: 'transparent' },
  label: { fontSize: 13, fontWeight: 'bold', marginBottom: 8 },
  input: { backgroundColor: '#E5E5E5', padding: 15, borderRadius: 12, color: '#000', height: 55 },
  saveButton: { backgroundColor: '#000', padding: 18, borderRadius: 12, marginTop: 20, alignItems: 'center', alignSelf: 'center', width: 140 },
  saveText: { color: '#fff', fontWeight: 'bold' }
});