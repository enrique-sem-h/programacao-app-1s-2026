import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface Anuncio {
  id: string;
  titulo: string;
  valorDiario: number;
  fotos: { url: string; principal: boolean }[];
}

export default function MyAds() {
  const router = useRouter();
  const { token } = useAuth();
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMeusAnuncios() {
    try {
      const response = await fetch(`${API_URL}/anuncios/meus-anuncios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();
      setAnuncios(json.anuncios ?? []);
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeusAnuncios();
  }, [token]);

  async function handleDelete(id: string) {
    Alert.alert("Excluir anúncio", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`${API_URL}/anuncios/${id}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
              setAnuncios((prev) => prev.filter((a) => a.id !== id));
              Alert.alert("Sucesso", "Anúncio excluído!");
            } else {
              Alert.alert("Erro", "Não foi possível excluir.");
            }
          } catch {
            Alert.alert("Erro", "Não foi possível conectar ao servidor.");
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Meus anúncios",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
              <Ionicons name="chevron-back" size={24} lightColor="#000" darkColor="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {anuncios.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="megaphone-outline" size={40} color="#ccc" />
          <Text style={{ color: "#aaa", marginTop: 10 }}>Nenhum anúncio encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={anuncios}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const foto = item.fotos?.find((f) => f.principal)?.url ?? item.fotos?.[0]?.url;
            return (
              <View style={styles.adCard}>
                <View style={styles.imagePlaceholder}>
                  {foto ? (
                    <Image source={{ uri: foto }} style={styles.image} resizeMode="cover" />
                  ) : (
                    <Ionicons name="image-outline" size={40} color="#ccc" />
                  )}
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.adTitle} numberOfLines={1}>{item.titulo}</Text>
                  <Text style={styles.adPrice}>R$ {Number(item.valorDiario).toFixed(2)}/dia</Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => router.push({ pathname: "/editAd", params: { id: item.id } })}
                    >
                      <Ionicons name="pencil-sharp" size={14} color="#fff" />
                      <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Ionicons name="trash-outline" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: { padding: 10 },
  adCard: {
    flex: 1, margin: 8, borderRadius: 12, backgroundColor: "#fff",
    elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, overflow: "hidden",
    borderWidth: 1, borderColor: "#f0f0f0",
  },
  imagePlaceholder: { height: 110, backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: "100%" },
  infoContainer: { padding: 12, backgroundColor: "transparent" },
  adTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  adPrice: { fontSize: 13, color: "#007AFF", fontWeight: "700", marginBottom: 10 },
  buttonRow: { flexDirection: "row", gap: 8 },
  editButton: {
    flex: 1, flexDirection: "row", backgroundColor: "#000",
    paddingVertical: 6, borderRadius: 6, justifyContent: "center", alignItems: "center",
  },
  editButtonText: { color: "#fff", fontSize: 12, fontWeight: "600", marginLeft: 5 },
  deleteButton: {
    backgroundColor: "#FF3B30", paddingVertical: 6, paddingHorizontal: 10,
    borderRadius: 6, justifyContent: "center", alignItems: "center",
  },
});