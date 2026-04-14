import React from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Register({ navigation }: any) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Registrar</Text>
        <TextInput
          style={[styles.textField, { marginTop: "5%" }]}
          placeholder="e-mail"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.textField}
          placeholder="confirmar e-mail"
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.textField, { marginBottom: "3%" }]}
          placeholder="senha"
          placeholderTextColor="#999"
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#4a91e29d" : "#4a90e2" },
          ]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  textField: {
    margin: 10,
    padding: 15,
    width: 400,
    maxWidth: "100%",
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 16,
  },
  button: {
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    width: "40%",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
