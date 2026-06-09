import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RentalStatus() {
  const router = useRouter();
  const { chatId, aluguelId } = useLocalSearchParams<{ chatId: string; aluguelId: string }>();

  const steps = [
    { id: 1, title: "Pedido Confirmado", time: "✓", completed: true },
    { id: 2, title: "Aguardando locador", time: "Em andamento", completed: false, active: true },
    { id: 3, title: "Objeto a caminho", time: "--:--", completed: false },  // pensar nesse fluxo dps
    { id: 4, title: "Entrega concluída", time: "--:--", completed: false },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Acompanhar Aluguel" }} />

      <View style={styles.productCard}>
        <View style={styles.imageWrapper}>
          <Ionicons name="checkmark-circle" size={40} color="#4BB543" />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Pagamento confirmado!</Text>
          <Text style={styles.productSeller}>Aluguel #{aluguelId?.slice(0, 8)}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>AGUARDANDO LOCADOR</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Status da Entrega</Text>

      <View style={styles.timelineContainer}>
        {steps.map((step, index) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.leftColumn}>
              <View style={[
                styles.dot,
                step.completed ? styles.dotCompleted : (step.active ? styles.dotActive : styles.dotPending)
              ]}>
                {step.completed && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              {index !== steps.length - 1 && <View style={styles.lineConnector} />}
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.stepHeader}>
                <Text style={[styles.stepTitle, step.active && styles.textActive]}>{step.title}</Text>
                <Text style={styles.stepTime}>{step.time}</Text>
              </View>

              {step.active && chatId && (
                <View style={styles.mapContainer}>
                  <View style={styles.mapMock}>
                    <Ionicons name="chatbubbles-outline" size={40} color="#666" />
                    <Text style={styles.mapText}>Entre em contato com o locador para combinar a entrega</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => router.push({
                      pathname: "/chatDetails",
                      params: { chatId, userName: "Locador" }
                    })}
                  >
                    <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
                    <Text style={styles.callButtonText}>Conversar com Locador</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.replace("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Voltar para o Início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  productCard: {
    flexDirection: "row", backgroundColor: "#E5E5E5",
    padding: 20, borderRadius: 20, marginBottom: 30, alignItems: "center",
  },
  imageWrapper: {
    width: 80, height: 80, backgroundColor: "#fff",
    borderRadius: 15, justifyContent: "center", alignItems: "center",
  },
  productInfo: { flex: 1, marginLeft: 15, backgroundColor: "transparent" },
  productName: { color: "#000", fontSize: 16, fontWeight: "bold" },
  productSeller: { color: "#666", fontSize: 13, marginTop: 4 },
  statusBadge: {
    backgroundColor: "#4BB543", paddingHorizontal: 10,
    paddingVertical: 5, borderRadius: 8, alignSelf: "flex-start", marginTop: 10,
  },
  statusBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  timelineContainer: { paddingLeft: 10, backgroundColor: "transparent" },
  stepRow: { flexDirection: "row", backgroundColor: "transparent" },
  leftColumn: { alignItems: "center", width: 30, backgroundColor: "transparent" },
  rightColumn: { flex: 1, marginLeft: 15, marginBottom: 30, backgroundColor: "transparent" },
  dot: { width: 24, height: 24, borderRadius: 12, justifyContent: "center", alignItems: "center", zIndex: 2 },
  dotCompleted: { backgroundColor: "#4BB543" },
  dotActive: { backgroundColor: "#007AFF", borderWidth: 4, borderColor: "#CCE5FF" },
  dotPending: { backgroundColor: "#DDD" },
  lineConnector: { width: 2, flex: 1, backgroundColor: "#EEE" },
  stepHeader: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "transparent" },
  stepTitle: { fontSize: 15, fontWeight: "600", color: "#888" },
  textActive: { color: "#000", fontWeight: "bold" },
  stepTime: { fontSize: 12, color: "#AAA" },
  mapContainer: { marginTop: 15, backgroundColor: "transparent" },
  mapMock: {
    height: 120, backgroundColor: "#F5F5F5", borderRadius: 15,
    borderWidth: 1, borderColor: "#E0E0E0",
    justifyContent: "center", alignItems: "center", padding: 20,
  },
  mapText: { fontSize: 12, color: "#888", marginTop: 10, textAlign: "center" },
  callButton: {
    backgroundColor: "#007AFF", flexDirection: "row", padding: 12,
    borderRadius: 10, marginTop: 10, justifyContent: "center", alignItems: "center",
  },
  callButtonText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },
  primaryButton: {
    backgroundColor: "#000", padding: 18, borderRadius: 15,
    alignItems: "center", marginTop: 20, marginBottom: 40,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});