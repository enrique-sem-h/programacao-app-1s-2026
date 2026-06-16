import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ColorSchemeName,
  Image,
  ActivityIndicator,
} from "react-native";
import { View, Text } from "@/components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import type { Anuncio } from "@/src/@types/types";
import { getFotoPrincipal } from "@/src/@types/types";
import { getOptimizedImageUrl } from "@/src/images/optimizedImage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Search() {
  const router = useRouter();
  const { token } = useAuth();
  const styles = createStyles(useColorScheme());

  const [query, setQuery] = useState("");
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [filtrados, setFiltrados] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnuncios() {
      try {
        const response = await fetch(`${API_URL}/anuncios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();
        const lista = json.anuncios ?? [];
        setAnuncios(lista);
        setFiltrados(lista);
      } catch (error) {
        console.error("Erro ao buscar anúncios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnuncios();
  }, [token]);

  useEffect(() => {
    if (!query.trim()) {
      setFiltrados(anuncios);
      return;
    }
    const lower = query.toLowerCase();
    setFiltrados(
      anuncios.filter(
        (a) =>
          a.titulo.toLowerCase().includes(lower) ||
          a.descricao.toLowerCase().includes(lower) ||
          a.categoria.toLowerCase().includes(lower),
      ),
    );
  }, [query, anuncios]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
          <TextInput
            placeholder="O que você está procurando?"
            style={styles.searchInput}
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 40 }} />
        ) : filtrados.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum anúncio encontrado.</Text>
          </View>
        ) : (
          <FlatList
            data={filtrados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const foto = getOptimizedImageUrl(getFotoPrincipal(item.fotos), {
                width: 220,
                height: 220,
              });
              return (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => router.push({ pathname: "/adDetails", params: { id: item.id } })}
                >
                  <View style={styles.resultImage}>
                    {foto ? (
                      <Image source={{ uri: foto }} style={styles.image} resizeMode="cover" />
                    ) : (
                      <Ionicons name="image-outline" size={30} color="#ccc" />
                    )}
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={styles.titulo} numberOfLines={1}>{item.titulo}</Text>
                    <Text style={styles.categoria}>{item.categoria}</Text>
                    <Text style={styles.preco}>R$ {Number(item.valorDiario).toFixed(2)}/dia</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const createStyles = (theme: ColorSchemeName) =>
  StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.light.background,
      borderRadius: 10,
      paddingHorizontal: 15,
      height: 50,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#eee",
    },
    searchInput: { flex: 1, fontSize: 16, color: "#000" },
    resultItem: { flexDirection: "row", marginBottom: 20, backgroundColor: "transparent" },
    resultImage: {
      width: 100, height: 100, backgroundColor: "#eee",
      borderRadius: 8, marginRight: 15,
      justifyContent: "center", alignItems: "center",
      overflow: "hidden",
    },
    image: { width: "100%", height: "100%" },
    resultInfo: { flex: 1, justifyContent: "center", backgroundColor: "transparent" },
    titulo: { fontSize: 15, fontWeight: "600", marginBottom: 4, color: "#000" },
    categoria: { fontSize: 12, color: "#888", marginBottom: 6 },
    preco: { fontSize: 14, color: "#007AFF", fontWeight: "700" },
    empty: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "transparent" },
    emptyText: { color: "#aaa", marginTop: 10 },
  });
