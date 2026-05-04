import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile() {
  const router = useRouter();

  const InputField = ({ label, placeholder, isLocked = false }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input} placeholder={placeholder} editable={!isLocked} />
        {isLocked && <Ionicons name="lock-closed" size={16} color="#aaa" />}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Perfil" }} />
      
      <View style={styles.avatarSection}>
        <View style={styles.avatarLarge}>
          <Ionicons name="person" size={60} color="#ccc" />
        </View>
      </View>

      <InputField label="E-mail" placeholder="mariana@email.com" />
      
      <TouchableOpacity style={styles.passwordButton}>
        <Text style={styles.passwordText}>Alterar senha</Text>
      </TouchableOpacity>

      <InputField label="Nome" placeholder="Mariana" isLocked />
      <InputField label="CPF" placeholder="***.***.***-**" isLocked />
      <InputField label="Endereço" placeholder="AV. das Araucarias, 123" />
      <InputField label="Telefone" placeholder="(61) 94002-8922" />

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatarLarge: { width: 120, height: 120, borderRadius: 10, backgroundColor: "#eee", justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  inputGroup: { marginBottom: 15, backgroundColor: 'transparent' },
  label: { fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 5, paddingHorizontal: 10 },
  input: { flex: 1, paddingVertical: 12, fontSize: 14 },
  passwordButton: { backgroundColor: '#333', padding: 12, borderRadius: 5, marginBottom: 20, alignItems: 'center' },
  passwordText: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#000', padding: 18, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' }
});