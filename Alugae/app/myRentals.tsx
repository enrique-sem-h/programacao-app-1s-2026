import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Aluguel {
  id: string;
  status: string;
  valorTotal: number;
  dataInicio: string;
  dataFim: string;
  anuncioId: string;
  titulo: string;
  fotoPrincipal: string | null;
}

export default function MyRentals() {
  const router = useRouter();
  const { token } = useAuth();
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlugueis() {
      try {
        const response = await fetch(`${API_URL}/alugueis/meus`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();
        setAlugueis(json.alugueis ?? []);
      } catch (error) {
        console.error("Erro ao buscar aluguéis:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlugueis();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Meus aluguéis" }} />

      {alugueis.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="cube-outline" size={40} color="#ccc" />
          <Text style={{ color: "#aaa", marginTop: 10 }}>Nenhum aluguel encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={alugueis}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imagePlaceholder}>
                {item.fotoPrincipal ? (
                  <Image
                    source={{ uri: item.fotoPrincipal }}
                    style={{ width: "100%", height: "100%", borderRadius: 8 }}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="cube-outline" size={40} color="#888" />
                )}

                <View style={[
                  styles.badge,
                  item.status === "ativo" ? styles.badgeAtivo :
                  item.status === "em_uso" ? styles.badgeUso : styles.badgeFim
                ]}>
                  <Text style={styles.badgeText}>
                    {item.status === "ativo" ? "ATIVO" :
                     item.status === "em_uso" ? "EM USO" : "FIM"}
                  </Text>
                </View>
              </View>

              <Text style={styles.itemTitle}>{item.titulo}</Text>
              <Text style={styles.itemDates}>{item.dataInicio} → {item.dataFim}</Text>
              <Text style={styles.itemPrice}>R$ {Number(item.valorTotal).toFixed(2)}</Text>

              {item.status === "ativo" && (
                <TouchableOpacity
                  style={[styles.button, styles.btnAtivo]}
                  onPress={() => router.push("/rentalStatus")}
                >
                  <Text style={styles.buttonText}>Acompanhar</Text>
                </TouchableOpacity>
              )}

              {item.status === "em_uso" && (
                <TouchableOpacity
                  style={[styles.button, styles.btnUso]}
                  onPress={() => router.push("/returnObject")}
                >
                  <Text style={styles.buttonText}>Devolver</Text>
                </TouchableOpacity>
              )}

              {item.status === "finalizado" && (
                <TouchableOpacity
                  style={[styles.button, styles.btnFim]}
                  onPress={() => router.push("/rating")}
                >
                  <Text style={styles.buttonText}>Avaliar</Text>
                </TouchableOpacity>
              )}

              {item.status === "pendente" && (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#FF9500" }]}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonText}>Pendente</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  itemTitle: { fontWeight: "bold", fontSize: 14, marginBottom: 4, textAlign: "center", color: "#000" },
  itemDates: { fontSize: 10, color: "#888", marginBottom: 4 },
  itemPrice: { fontSize: 12, color: "#007AFF", fontWeight: "600", marginBottom: 8 },
  button: { width: "100%", padding: 10, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 11, fontWeight: "bold" },
  btnAtivo: { backgroundColor: "#000" },
  btnUso: { backgroundColor: "#007AFF" },
  btnFim: { backgroundColor: "#888" },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeAtivo: { backgroundColor: "#4BB543" },
  badgeUso: { backgroundColor: "#007AFF" },
  badgeFim: { backgroundColor: "#555" },
  badgeText: { color: "#fff", fontSize: 8, fontWeight: "bold" },
});