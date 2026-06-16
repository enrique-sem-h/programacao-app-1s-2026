import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import { API_URL } from "@/constants/constants";

const PasswordField = ({
  label,
  setValue,
}: {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      secureTextEntry
      placeholder="******"
      placeholderTextColor="#888"
      onChangeText={setValue}
    />
  </View>
);

export default function EditPassword() {
  const router = useRouter();
  const { user, update, token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const canProceed =
    currentPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "";

  async function handleSave() {
    if (newPassword !== confirmPassword) {
      return Alert.alert("Erro", "As senhas não coincidem");
    }

    const passwordCheck = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: user?.email,
          senha: currentPassword,
        },
      }),
    });

    if (!passwordCheck.ok) {
      return Alert.alert("Erro", "Verifique a senha atual e tente novamente!");
    }

    const formData = new FormData();

    formData.append("senha", newPassword);

    const result = await fetch(`${API_URL}/user/${user?.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (result.ok) {
      Alert.alert("Sucesso", "Sua senha foi atualizada com sucesso!", [
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
      `houve um erro no servidor, verifique se as senhas estão de acordo e tente novamente`,
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Alterar Senha" }} />

      <PasswordField label="Senha atual" setValue={setCurrentPassword} />
      <PasswordField label="Nova senha" setValue={setNewPassword} />
      <PasswordField
        label="Confirmar nova senha"
        setValue={setConfirmPassword}
      />

      <TouchableOpacity
        style={[{ opacity: canProceed ? 1 : 0.3 }, styles.saveButton]}
        disabled={!canProceed}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputGroup: { marginBottom: 20, backgroundColor: "transparent" },
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
    marginTop: 20,
    alignItems: "center",
    alignSelf: "center",
    width: 140,
  },
  saveText: { color: "#fff", fontWeight: "bold" },
});
