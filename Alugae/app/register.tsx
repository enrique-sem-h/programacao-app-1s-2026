import React from "react";
import { StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Text, View } from "@/components/Themed"; 
import MainButton from "@/components/MainButton";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const router = useRouter();

  const InputLabel = ({ label }: { label: string }) => (
    <Text style={styles.label}>{label}</Text>
  );

  return (
    <ScrollView 
      style={styles.mainContainer} 
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
           <Ionicons name="person-outline" size={40} color="#888" />
        </View>
      </View>

      <View style={styles.form}>
        <InputLabel label="Nome" />
        <TextInput style={styles.input} placeholder="Seu nome completo" placeholderTextColor="#999" />

        <InputLabel label="CPF" />
        <TextInput style={styles.input} placeholder="000.000.000-00" keyboardType="numeric" placeholderTextColor="#999" />

        <InputLabel label="Endereço" />
        <TextInput style={styles.input} placeholder="Rua, número, bairro" placeholderTextColor="#999" />

        <InputLabel label="Telefone" />
        <TextInput style={styles.input} placeholder="(00) 00000-0000" keyboardType="phone-pad" placeholderTextColor="#999" />

        <InputLabel label="E-mail" />
        <TextInput style={styles.input} placeholder="email@exemplo.com" keyboardType="email-address" placeholderTextColor="#999" />

        <InputLabel label="Senha" />
        <TextInput style={styles.input} placeholder="******" secureTextEntry placeholderTextColor="#999" />

        <InputLabel label="Confirmar senha" />
        <TextInput style={styles.input} placeholder="******" secureTextEntry placeholderTextColor="#999" />

        <View style={styles.buttonWrapper}>
          <MainButton
            title="Cadastrar"
            onPress={() => router.replace("/(tabs)/home")}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "transparent",
    paddingTop: 20,
  },
  backButton: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    paddingHorizontal: "5%",
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: "2%",
  },
  input: {
    backgroundColor: "#333", 
    padding: 12,
    borderRadius: 16, 
    marginBottom: 15,
    width: "100%",
    color: "#fff", 
    borderWidth: 1,
    borderColor: "#444",
  },
  buttonWrapper: {
    marginTop: 20,
    backgroundColor: "transparent",
    alignItems: 'center'
  }
});