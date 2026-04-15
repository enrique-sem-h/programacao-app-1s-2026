import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function DashboardAdmin({ navigation }: any) {
  const crudItens = [
    { id: "1", nome: "Cidades", icon: "map-pin" },
    { id: "2", nome: "Tags", icon: "hash" },
    { id: "3", nome: "Perfis", icon: "users" },
    { id: "4", nome: "UF", icon: "map" },
    { id: "5", nome: "Notícias", icon: "file-text" },
    { id: "6", nome: "Usuarios", icon: "user-plus" },
    { id: "7", nome: "Gerenciar Comentarios", icon: "message-circle" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Dashboard de Controle</Text>
      </View>

      <FlatList
        data={crudItens}
        numColumns={2} 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Feather name={item.icon as any} size={28} color="#6c5ce7" />
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Sair do Painel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: 
    { flex: 1,
    backgroundColor: "#f8f9fa" },
  header: 
  { padding: 20, alignItems: "center", 
  backgroundColor: "#fff" },
  title: 
    { fontSize: 24, 
    fontWeight: "bold" },
  subtitle: 
  { color: "#666" },
  listContent: 
  { padding: 10 },
  card: 
  {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    height: 120,
  },
  cardText: { marginTop: 10, fontWeight: "600", textAlign: "center", fontSize: 13 },
  backButton: { margin: 20, padding: 15, backgroundColor: "#ff4757", borderRadius: 10, alignItems: "center" },
  backButtonText: { color: "#fff", fontWeight: "bold" }
});