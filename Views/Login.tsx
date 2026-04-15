import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Login({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Selecione seu perfil para entrar:</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4a90e2" }]}
        onPress={() => navigation.navigate("Autor")}
      >
        <Text style={styles.buttonText}>Entrar como AUTOR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#50c878" }]}
        onPress={() => navigation.navigate("Leitor")}
      >
        <Text style={styles.buttonText}>Entrar como LEITOR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#333" }]}
        onPress={() => navigation.navigate("Editor")}
      >
        <Text style={styles.buttonText}>Entrar como EDITOR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6c5ce7", marginTop: 20 }]}
        onPress={() => navigation.navigate("DashboardAdmin")}
      >
        <Text style={styles.buttonText}>Entrar como SUPERADMIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { textAlign: "center", marginBottom: 40, color: "#666" },
  button: {
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
