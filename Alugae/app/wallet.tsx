import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Transacao {
  id: string;
  valorTotal: number;
  status: string;
  dataInicio: string;
  dataFim: string;
  titulo: string;
  tipo: "gasto" | "ganho";
}

interface Carteira {
  totalGanho: number;
  totalGasto: number;
  alugueisAtivos: number;
  historico: Transacao[];
}

export default function Wallet() {
  const router = useRouter();
  const { token } = useAuth();
  const [carteira, setCarteira] = useState<Carteira | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarteira() {
      try {
        const response = await fetch(`${API_URL}/carteira`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();
        setCarteira(json);
      } catch (error) {
        console.error("Erro ao buscar carteira:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCarteira();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ title: "Carteira" }} />

      {/* Resumo */}
      <View style={styles.resumoContainer}>
        <View style={styles.resumoCard}>
          <Ionicons name="arrow-up-circle" size={28} color="#FF3B30" />
          <Text style={styles.resumoLabel}>Total gasto</Text>
          <Text style={[styles.resumoValor, { color: "#FF3B30" }]}>
            R$ {Number(carteira?.totalGasto ?? 0).toFixed(2)}
          </Text>
        </View>

        <View style={styles.resumoCard}>
          <Ionicons name="arrow-down-circle" size={28} color="#4BB543" />
          <Text style={styles.resumoLabel}>Total ganho</Text>
          <Text style={[styles.resumoValor, { color: "#4BB543" }]}>
            R$ {Number(carteira?.totalGanho ?? 0).toFixed(2)}
          </Text>
        </View>

        <View style={styles.resumoCard}>
          <Ionicons name="time-outline" size={28} color="#007AFF" />
          <Text style={styles.resumoLabel}>Ativos</Text>
          <Text style={[styles.resumoValor, { color: "#007AFF" }]}>
            {carteira?.alugueisAtivos ?? 0}
          </Text>
        </View>
      </View>

      {/* Saldo líquido */}
      <View style={styles.saldoCard}>
        <Text style={styles.saldoLabel}>Saldo líquido</Text>
        <Text style={[
          styles.saldoValor,
          { color: (carteira?.totalGanho ?? 0) - (carteira?.totalGasto ?? 0) >= 0 ? "#4BB543" : "#FF3B30" }
        ]}>
          R$ {((carteira?.totalGanho ?? 0) - (carteira?.totalGasto ?? 0)).toFixed(2)}
        </Text>
        <Text style={styles.saldoSub}>ganhos - gastos</Text>
      </View>

      {/* Histórico */}
      <Text style={styles.sectionTitle}>Histórico de transações</Text>

      {carteira?.historico.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={40} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma transação ainda.</Text>
        </View>
      ) : (
        carteira?.historico.map((item) => (
          <View key={item.id} style={styles.transacaoCard}>
            <View style={[
              styles.transacaoIcone,
              { backgroundColor: item.tipo === "ganho" ? "#E8F5E9" : "#FFEBEE" }
            ]}>
              <Ionicons
                name={item.tipo === "ganho" ? "arrow-down" : "arrow-up"}
                size={20}
                color={item.tipo === "ganho" ? "#4BB543" : "#FF3B30"}
              />
            </View>
            <View style={styles.transacaoInfo}>
              <Text style={styles.transacaoTitulo} numberOfLines={1}>
                {item.titulo ?? "Anúncio"}
              </Text>
              <Text style={styles.transacaoData}>
                {item.dataInicio} → {item.dataFim}
              </Text>
              <Text style={styles.transacaoStatus}>{item.status}</Text>
            </View>
            <Text style={[
              styles.transacaoValor,
              { color: item.tipo === "ganho" ? "#4BB543" : "#FF3B30" }
            ]}>
              {item.tipo === "ganho" ? "+" : "-"}R$ {Number(item.valorTotal).toFixed(2)}
            </Text>
          </View>
        ))
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  resumoContainer: {
    flexDirection: "row", gap: 10, marginBottom: 20,
  },
  resumoCard: {
    flex: 1, backgroundColor: "#f5f5f5", borderRadius: 12,
    padding: 12, alignItems: "center", gap: 4,
  },
  resumoLabel: { fontSize: 11, color: "#888", textAlign: "center" },
  resumoValor: { fontSize: 15, fontWeight: "bold" },
  saldoCard: {
    backgroundColor: "#000", borderRadius: 16, padding: 24,
    alignItems: "center", marginBottom: 25,
  },
  saldoLabel: { color: "#aaa", fontSize: 13, marginBottom: 8 },
  saldoValor: { fontSize: 32, fontWeight: "bold" },
  saldoSub: { color: "#666", fontSize: 11, marginTop: 4 },
  sectionTitle: {
    fontSize: 16, fontWeight: "bold", marginBottom: 15,
    color: "#888", textTransform: "uppercase", letterSpacing: 1,
  },
  empty: { alignItems: "center", paddingVertical: 30 },
  emptyText: { color: "#aaa", marginTop: 10 },
  transacaoCard: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#f9f9f9", borderRadius: 12,
    padding: 15, marginBottom: 10,
  },
  transacaoIcone: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: "center", alignItems: "center", marginRight: 12,
  },
  transacaoInfo: { flex: 1 },
  transacaoTitulo: { fontWeight: "600", fontSize: 14, marginBottom: 2 },
  transacaoData: { fontSize: 11, color: "#888", marginBottom: 2 },
  transacaoStatus: { fontSize: 11, color: "#aaa" },
  transacaoValor: { fontWeight: "bold", fontSize: 15 },
});