import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Wallet() {
  const router = useRouter();

  const Card = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.square} />
      </View>
      <Text style={styles.cardDigits}>{subtitle}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Carteira", headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="chevron-back" size={24} /></TouchableOpacity>
      )}} />
      
      <Text style={styles.sectionLabel}>Meus cartões</Text>
      <Card title="Cartão de Crédito" subtitle="*** *** ***" />
      <Card title="Cartão de Débito" subtitle="*** *** ***" />

      <Text style={styles.sectionLabel}>Pix</Text>
      <View style={styles.listCard}><Text style={styles.cardTitle}>Pix</Text></View>

      <Text style={styles.sectionLabel}>Saldo</Text>
      <TouchableOpacity onPress={() => router.push("/balance")} style={styles.listCard}>
        <Text style={styles.cardTitle}>Saldo alugaê</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.blackButton}>
        <Text style={styles.buttonText}>Adicionar método</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionLabel: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  card: { borderWidth: 1, borderColor: "#000", borderRadius: 10, padding: 15, marginBottom: 15 },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  cardDigits: { marginTop: 10, letterSpacing: 2 },
  listCard: { borderWidth: 1, borderColor: "#000", borderRadius: 10, padding: 20, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' },
  square: { width: 15, height: 15, backgroundColor: '#ddd' },
  blackButton: { backgroundColor: "#000", padding: 18, borderRadius: 8, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" }
});