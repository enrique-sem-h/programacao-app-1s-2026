import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import type { Anuncio } from "@/src/@types/types";
import { getFotoPrincipal } from "@/src/@types/types";
import { getOptimizedImageUrl } from "@/src/images/optimizedImage";

const { width } = Dimensions.get("window");
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function AdDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { token, user } = useAuth();

  const [anuncio, setAnuncio] = useState<Anuncio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnuncio() {
      try {
        const response = await fetch(`${API_URL}/anuncios/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar anúncio.");

        const json = await response.json();
        setAnuncio(json.anuncio ?? json);
      } catch (err: any) {
        setError(err.message ?? "Erro inesperado.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAnuncio();
  }, [id, token]);

  const isMeuAnuncio = anuncio?.usuarioId === user?.id;
  const fotoPrincipal = getOptimizedImageUrl(getFotoPrincipal(anuncio?.fotos ?? []), {
    width: Math.ceil(width * 2),
    height: 600,
    quality: 75,
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Detalhes do Item",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
              <Ionicons name="chevron-back" size={24} lightColor="#000" darkColor="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Ionicons name="cloud-offline-outline" size={40} color="#ccc" />
          <Text style={{ color: "#aaa", marginTop: 10 }}>{error}</Text>
        </View>
      ) : anuncio ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              {fotoPrincipal ? (
                <Image
                  source={{ uri: fotoPrincipal }}
                  style={styles.image}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="image-outline" size={80} color="#ccc" />
              )}
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{anuncio.titulo}</Text>
              <Text style={styles.price}>R$ {Number(anuncio.valorDiario).toFixed(2)} / dia</Text>
              <Text style={styles.caucao}>Caução: R$ {Number(anuncio.caucao).toFixed(2)}</Text>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Categoria</Text>
              <Text style={styles.description}>{anuncio.categoria}</Text>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.description}>{anuncio.descricao}</Text>

              {anuncio.fotos.length > 1 && (
                <>
                  <View style={styles.divider} />
                  <Text style={styles.sectionTitle}>Mais fotos</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {anuncio.fotos.map((foto) => (
                      <Image
                        key={foto.id}
                        source={{
                          uri: getOptimizedImageUrl(foto.url, {
                            width: 220,
                            height: 220,
                          })!,
                        }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                      />
                    ))}
                  </ScrollView>
                </>
              )}
            </View>
            <View style={{ height: 100 }} />
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.ownerInfo}>
              <View style={styles.ownerAvatar} />
              <Text style={styles.ownerName}>
                {isMeuAnuncio ? "Meu anúncio" : "Anunciante"}
              </Text>
            </View>

            <View style={styles.actionButtons}>
              {!isMeuAnuncio && (
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => router.push("/chat")}
                >
                  <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
              )}

              {isMeuAnuncio ? (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push({ pathname: "/editAd", params: { id: anuncio.id } })}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.rentButton}
                  onPress={() => router.push({
                    pathname: "/bookingSummary",
                    params: {
                      anuncioId: anuncio.id,
                      titulo: anuncio.titulo,
                      valorDiario: anuncio.valorDiario,
                      caucao: anuncio.caucao,
                      fotoPrincipal: getFotoPrincipal(anuncio.fotos) ?? "",
                    }
                  })}
                >
                  <Text style={styles.buttonText}>Alugar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageContainer: {
    width: width, height: 300,
    backgroundColor: "#eee", justifyContent: "center", alignItems: "center",
  },
  image: { width: width, height: 300 },
  thumbnail: { width: 100, height: 100, borderRadius: 8, marginRight: 10 },
  content: { padding: 20, backgroundColor: "transparent" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 20, color: "#007AFF", fontWeight: "700", marginBottom: 4 },
  caucao: { fontSize: 14, color: "#666", marginBottom: 15 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 14, color: "#666", lineHeight: 20 },
  footer: {
    position: "absolute", bottom: 0, width: width,
    padding: 20, flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", borderTopWidth: 1,
    borderTopColor: "#eee", backgroundColor: "#fff",
  },
  ownerInfo: { flexDirection: "row", alignItems: "center", backgroundColor: "transparent" },
  ownerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#ddd", marginRight: 10 },
  ownerName: { fontWeight: "bold" },
  actionButtons: { flexDirection: "row", backgroundColor: "transparent" },
  chatButton: {
    backgroundColor: "#333", paddingVertical: 12,
    paddingHorizontal: 20, borderRadius: 8, marginRight: 10,
  },
  rentButton: {
    backgroundColor: "#000", paddingVertical: 12,
    paddingHorizontal: 20, borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#007AFF", paddingVertical: 12,
    paddingHorizontal: 20, borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
